'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type SiteShellProps = {
  navigation: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export default function SiteShell({ navigation, footer, children }: SiteShellProps) {
  const pathname = usePathname();
  const isKeystatic = pathname === '/keystatic' || pathname.startsWith('/keystatic/');

  if (isKeystatic) return <>{children}</>;

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      {navigation}
      <div id="main-content" className="site-main" tabIndex={-1}>
        {children}
      </div>
      {footer}
    </>
  );
}
