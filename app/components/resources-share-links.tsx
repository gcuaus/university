'use client';

import { useEffect, useState } from 'react';

export default function ResourcesShareLinks({ title }: { title: string }) {
  const [articleUrl, setArticleUrl] = useState('');

  useEffect(() => {
    setArticleUrl(window.location.href);
  }, []);

  const shareText = `${title} ${articleUrl}`.trim();
  const encodedText = encodeURIComponent(shareText);
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(articleUrl);

  return (
    <nav className="resource-share" aria-label="Share this article">
      <span>Share this article</span>
      <a href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}>Email</a>
      <a href={`https://wa.me/?text=${encodedText}`} target="_blank" rel="noreferrer">WhatsApp</a>
      <a href={`https://www.threads.net/intent/post?text=${encodedText}`} target="_blank" rel="noreferrer">Threads</a>
      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodedUrl}`} target="_blank" rel="noreferrer">X</a>
    </nav>
  );
}
