import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Echo Marketplace',
  description: 'Plateforme multi-catégories pilotée par des agents IA.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <header>
          <h1>Echo</h1>
        </header>
        <main>{children}</main>
        <footer>
          <small>© {new Date().getFullYear()} Echo.</small>
        </footer>
      </body>
    </html>
  );
}
