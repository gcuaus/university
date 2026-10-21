'use client';

import { FormEvent, useState } from 'react';
import { getCountryCallingCode, getCountries, type Country } from 'react-phone-number-input';

function countryFlag(country: Country) {
  return country.replace(/./g, (character) => String.fromCodePoint(character.charCodeAt(0) + 127397));
}

function countryName(country: Country) {
  return new Intl.DisplayNames(['en'], { type: 'region' }).of(country) || country;
}

type Status = 'idle' | 'submitting' | 'sent' | 'error';

export default function EvaluationForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [country, setCountry] = useState<Country>('US');
  const [countrySearch, setCountrySearch] = useState('');
  const countryOptions = getCountries().map((countryCode) => ({
    code: countryCode,
    label: `${countryFlag(countryCode)} ${countryName(countryCode)} (+${getCountryCallingCode(countryCode)})`,
  }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const whatsapp = String(formData.get('whatsapp') || '');

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(formData.get('name') || ''),
          email: String(formData.get('email') || ''),
          whatsapp: whatsapp ? `+${getCountryCallingCode(country)} ${whatsapp}` : '',
          interest: String(formData.get('interest') || ''),
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || 'We could not submit your request. Please try again.');
      }

      setStatus('sent');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'We could not submit your request.');
    }
  }

  if (status === 'sent') {
    return (
      <p className="evaluation-success" role="status">
        Thank you. We will be in touch about your free evaluation.
      </p>
    );
  }

  return (
    <form className="evaluation-form" onSubmit={handleSubmit}>
      <label>Name<input name="name" required /></label>
      <label>Email<input name="email" type="email" required /></label>
      <label className="whatsapp-field">WhatsApp
        <span className="phone-input">
          <span className="country-picker">
            <input aria-label="Search country and calling code" className="country-search" list="country-options" value={countrySearch} onChange={(event) => { const selected = countryOptions.find((option) => option.label === event.target.value); if (selected) setCountry(selected.code); setCountrySearch(event.target.value); }} placeholder="Search country or code" required />
            <datalist id="country-options">
              {countryOptions.map((option) => <option value={option.label} key={option.code} />)}
            </datalist>
          </span>
          <input name="whatsapp" type="tel" inputMode="tel" placeholder="Phone number" required />
        </span>
      </label>
      <label className="interest-field">Ministry or study interest<textarea name="interest" rows={5} required /></label>
      {status === 'error' && <p className="evaluation-error" role="alert">{errorMessage}</p>}
      <button className="button gold" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Request evaluation'} <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
