import './globals.css';
import { Inter } from 'next/font/google';
import Login from './login';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Nudge & Budge',
  description: 'A dynamic budgeting system for the modern age.',
};

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang='en'>
      <body className={inter.className}>
        <Login session={session} />
        {children}
      </body>
    </html>
  );
}
