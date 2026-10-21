'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

type SiteDropdownProps = {
  children: ReactNode;
  className?: string;
  id: string;
  label: string;
};

export default function SiteDropdown({ children, className = '', id, label }: SiteDropdownProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (event.target instanceof Node && !dropdownRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, []);

  function handlePointerEnter() {
    if (closeTimer.current !== undefined) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = undefined;
    }
  }

  function handlePointerLeave() {
    if (window.matchMedia('(max-width: 720px)').matches) return;
    closeTimer.current = window.setTimeout(() => setOpen(false), 150);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') setOpen(false);
  }

  return (
    <div
      className={`site-dropdown ${className}`}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handleKeyDown}
      ref={dropdownRef}
    >
      <button
        aria-controls={id}
        aria-expanded={open}
        className="site-dropdown-trigger"
        type="button"
        onClick={() => setOpen((current) => !current)}
      >
        {label}
      </button>
      <div className="site-dropdown-links" hidden={!open} id={id}>{children}</div>
    </div>
  );
}