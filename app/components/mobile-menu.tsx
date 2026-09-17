'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="mobile-menu">
      <button className="mobile-menu-button" type="button" aria-expanded={open} aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setOpen(!open)}>
        <span aria-hidden="true">{open ? '×' : '☰'}</span>
      </button>
      {open && <div className="mobile-menu-panel"><Link className={isActive('/about') ? 'is-active' : undefined} href="/about" aria-current={isActive('/about') ? 'page' : undefined} onClick={() => setOpen(false)}>About</Link><Link className={isActive('/programs') ? 'is-active' : undefined} href="/programs" aria-current={isActive('/programs') ? 'page' : undefined} onClick={() => setOpen(false)}>Programs</Link><Link className={isActive('/faculty') ? 'is-active' : undefined} href="/faculty" aria-current={isActive('/faculty') ? 'page' : undefined} onClick={() => setOpen(false)}>Faculty</Link><Link className={isActive('/location') ? 'is-active' : undefined} href="/location" aria-current={isActive('/location') ? 'page' : undefined} onClick={() => setOpen(false)}>Location</Link><Link className={isActive('/tuition') ? 'is-active' : undefined} href="/tuition" aria-current={isActive('/tuition') ? 'page' : undefined} onClick={() => setOpen(false)}>Tuition</Link><Link className={isActive('/') ? 'is-active' : undefined} href="/#evaluation" aria-current={isActive('/') ? 'page' : undefined} onClick={() => setOpen(false)}>Apply now</Link></div>}
    </div>
  );
}