'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);
  return (
    <main className="directory-page">
      <section className="directory-hero">
        <p className="eyebrow">Something went wrong</p>
        <h1>An unexpected error occurred.</h1>
        <p>Please try again. If the problem persists, contact the site administrator.</p>
        <div className="actions" style={{ marginTop: 28 }}>
          <button className="button gold" type="button" onClick={reset}>
            Try again
          </button>
        </div>
      </section>
    </main>
  );
}
