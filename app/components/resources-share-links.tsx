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
      <a className="resource-share-link" href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`} aria-label="Share by email" title="Email">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.75 5.5h16.5A1.75 1.75 0 0 1 22 7.25v9.5a1.75 1.75 0 0 1-1.75 1.75H3.75A1.75 1.75 0 0 1 2 16.75v-9.5A1.75 1.75 0 0 1 3.75 5.5Zm.1 2 8.15 6.1 8.15-6.1H3.85Zm16.15 9V9.5l-7.4 5.53a1 1 0 0 1-1.2 0L4 9.5v7h16Z" /></svg>
      </a>
      <a className="resource-share-link" href={`https://wa.me/?text=${encodedText}`} target="_blank" rel="noreferrer" aria-label="Share on WhatsApp" title="WhatsApp">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2a9.83 9.83 0 0 0-8.42 14.92L2.3 22l5.2-1.36A9.93 9.93 0 0 0 12.04 22h.01A10 10 0 0 0 22 12.01 9.92 9.92 0 0 0 12.04 2Zm.01 18.2h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.09.81.82-3.01-.2-.31A8.17 8.17 0 1 1 12.05 20.2Zm4.49-6.12c-.25-.12-1.49-.74-1.72-.82-.23-.08-.4-.12-.56.12-.17.25-.65.82-.8.99-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-.1-.74-.75-1.23-1.67-1.38-1.92-.14-.25-.01-.38.11-.5.11-.1.25-.28.37-.42.12-.15.16-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.08s.89 2.41 1.02 2.58c.12.16 1.76 2.69 4.27 3.77.6.26 1.07.41 1.44.52.6.19 1.15.16 1.58.1.48-.07 1.49-.61 1.7-1.2.21-.59.21-1.1.15-1.2-.06-.11-.23-.17-.48-.29Z" /></svg>
      </a>
      <a className="resource-share-link" href={`https://www.threads.net/intent/post?text=${encodedText}`} target="_blank" rel="noreferrer" aria-label="Share on Threads" title="Threads">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.19 23.5h-.01c-3.47-.02-6.14-1.17-7.93-3.4-1.59-1.98-2.41-4.77-2.37-8.06.04-3.16 1.18-5.83 3.2-7.52 1.84-1.54 4.13-2.25 6.8-2.25 2.25 0 4 .47 5.51 1.47 1.5 1 2.47 2.5 2.88 4.46l-2.56.55c-.59-2.74-2.52-4.13-5.74-4.13-2 0-3.67.49-4.95 1.45-1.51 1.14-2.29 3.01-2.32 5.57-.03 2.71.6 4.85 1.88 6.35 1.27 1.49 3.17 2.27 5.65 2.28h.02c2.22 0 3.95-.66 5.14-1.95.8-.86 1.3-1.97 1.48-3.29-1.25-.65-2.77-.99-4.54-1.01-1.51-.02-2.65.31-3.38 1-.45.42-.67.97-.67 1.63 0 .6.22 1.07.66 1.42.46.36 1.13.56 1.98.58 1.16.02 2.11-.29 2.82-.94.81-.75 1.36-1.96 1.62-3.6.03-.17.05-.34.06-.52-1.02-.51-2.3-.78-3.8-.78-1.39 0-2.46.25-3.19.75-.61.42-.92 1-.92 1.73h-2.58c0-1.57.71-2.91 2-3.8 1.18-.81 2.77-1.22 4.7-1.22 2.17 0 4.04.45 5.55 1.33l.66.39-.03.77c-.08 2.45-.83 4.49-2.2 5.97-1.7 1.84-4.06 2.77-7.02 2.77Z" /></svg>
      </a>
      <a className="resource-share-link" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Share on X" title="X">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.49h2.04L6.49 3.24H4.3l13.31 17.4Z" /></svg>
      </a>
    </nav>
  );
}
