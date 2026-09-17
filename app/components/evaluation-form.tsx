'use client';

import { FormEvent, useState } from 'react';

export default function EvaluationForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
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
      <button className="button gold" type="submit">Request evaluation <span aria-hidden="true">↗</span></button>
    </form>
  );
}
