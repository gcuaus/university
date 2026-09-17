'use client';

import { FormEvent, useState } from 'react';

const WHATSAPP_NUMBER = '';

export default function EvaluationForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = [
      `Name: ${formData.get('name') || ''}`,
      `Email: ${formData.get('email') || ''}`,
      `WhatsApp: ${formData.get('whatsapp') || ''}`,
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
      <label>WhatsApp<input name="whatsapp" type="tel" required /></label>
      <label>Ministry or study interest<textarea name="interest" rows={3} required /></label>
      <button className="button gold" type="submit">Request evaluation <span aria-hidden="true">↗</span></button>
    </form>
  );
}
