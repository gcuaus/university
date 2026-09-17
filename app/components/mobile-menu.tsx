'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-menu">
      <button className="mobile-menu-button" type="button" aria-expanded={open} aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setOpen(!open)}>
        <span aria-hidden="true">{open ? '×' : '☰'}</span>
      </button>
      {open && <div className="mobile-menu-panel"><Link href="/about" onClick={() => setOpen(false)}>About</Link><Link href="/programs" onClick={() => setOpen(false)}>Programs</Link><Link href="/faculty" onClick={() => setOpen(false)}>Faculty</Link><Link href="/tuition" onClick={() => setOpen(false)}>Tuition</Link></div>}
    </div>
  );
}