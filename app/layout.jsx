import './globals.css';
import { Inter } from 'next/font/google';
import Login from './login';
import Logout from './logout';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

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
        {session === null ? <Login /> : <Logout />}
        {children}
      </body>
    </html>
  );
}
