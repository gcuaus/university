import type { Metadata } from 'next';
import './navigation-footer.css';

export const metadata: Metadata = {
  title: 'GCTSA | Great Commission Theological Seminary of America',
  description: 'Great Commission Theological Seminary of America.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}