'use client';

import { FormEvent, useState } from 'react';

type Status = 'idle' | 'submitting' | 'sent' | 'error';

export default function EvaluationForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(formData.get('name') || ''),
          email: String(formData.get('email') || ''),
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
      <label>Ministry or study interest<textarea name="interest" rows={3} required /></label>
      {status === 'error' && <p className="evaluation-error" role="alert">{errorMessage}</p>}
      <button className="button gold" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Request evaluation'} <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
