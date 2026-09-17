'use client';

import { FormEvent, useState } from 'react';
import { getCountryCallingCode, getCountries, type Country } from 'react-phone-number-input';

const WHATSAPP_NUMBER = '';

function countryFlag(country: Country) {
  return country.replace(/./g, (character) => String.fromCodePoint(character.charCodeAt(0) + 127397));
}

function countryName(country: Country) {
  return new Intl.DisplayNames(['en'], { type: 'region' }).of(country) || country;
}

export default function EvaluationForm() {
  const [sent, setSent] = useState(false);
  const [country, setCountry] = useState<Country>('US');
  const [countrySearch, setCountrySearch] = useState('');
  const matchingCountries = getCountries().filter((countryCode) => countryName(countryCode).toLowerCase().includes(countrySearch.toLowerCase()));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = [
      `Name: ${formData.get('name') || ''}`,
      `Email: ${formData.get('email') || ''}`,
      `WhatsApp: +${getCountryCallingCode(country)} ${formData.get('whatsapp') || ''}`,
      `Ministry or study interest: ${formData.get('interest') || ''}`,
    ].join('\n');

    if (WHATSAPP_NUMBER) {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    }
    setSent(true);
  }

  if (sent) {
    return <p className="evaluation-success">Thank you. We will be in touch about your free evaluation.</p>;
  }

  return (
    <form className="evaluation-form" onSubmit={handleSubmit}>
      <label>Name<input name="name" required /></label>
      <label>Email<input name="email" type="email" required /></label>
      <label className="whatsapp-field">WhatsApp
        <span className="phone-input">
          <span className="country-picker">
            <input aria-label="Search country" className="country-search" value={countrySearch} onChange={(event) => setCountrySearch(event.target.value)} placeholder="Search country" />
            <select aria-label="Country calling code" value={country} onChange={(event) => { setCountry(event.target.value as Country); setCountrySearch(''); }}>
              {matchingCountries.map((countryCode) => <option value={countryCode} key={countryCode}>{countryFlag(countryCode)} {countryName(countryCode)} (+{getCountryCallingCode(countryCode)})</option>)}
            </select>
          </span>
          <input name="whatsapp" type="tel" inputMode="tel" placeholder="Phone number" required />
        </span>
      </label>
      <label className="interest-field">Ministry or study interest<textarea name="interest" rows={5} required /></label>
      <button className="button gold" type="submit">Request evaluation <span aria-hidden="true">↗</span></button>
    </form>
  );
}
