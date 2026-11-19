'use client';

import { FormEvent, useState } from 'react';

type Status = 'idle' | 'submitting' | 'sent' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(formData.get('name') || ''),
          phone: String(formData.get('phone') || ''),
          email: String(formData.get('email') || ''),
          subject: String(formData.get('subject') || ''),
          message: String(formData.get('message') || ''),
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || 'We could not send your message. Please try again.');
      }

      setStatus('sent');
      event.currentTarget.reset();
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'We could not send your message.');
    }
  }

  if (status === 'sent') {
    return (
      <p className="contact-success" role="status">
        Thank you. A member of the GCUA team will respond as soon as possible.
      </p>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>Your Name *<input name="name" autoComplete="name" required /></label>
      <label>Phone Number<input name="phone" type="tel" autoComplete="tel" /></label>
      <label>Email Address *<input name="email" type="email" autoComplete="email" required /></label>
      <label>Subject
        <select name="subject" required defaultValue="">
          <option value="" disabled>What is this about?</option>
          <option>General Question</option>
          <option>Enrollment &amp; Programs</option>
          <option>Tuition &amp; Payment</option>
          <option>Credit Transfer</option>
          <option>Ministry Experience Credit</option>
          <option>Current Student Support</option>
          <option>Other</option>
        </select>
      </label>
      <label className="contact-field-wide">Message *<textarea name="message" rows={6} required /></label>
      {status === 'error' && <p className="contact-error" role="alert">{errorMessage}</p>}
      <button className="button gold contact-submit" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send Message'} <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
