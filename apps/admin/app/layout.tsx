import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Echo Admin',
  description: 'Back-office Echo avec contrôles RBAC.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <header>
          <h1>Echo Admin</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
