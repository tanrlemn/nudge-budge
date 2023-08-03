// server
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'NudgeBudge',
  description: 'A dynamic budgeting system for the modern age.',
};

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if (session === null && path !== '/') {
  //   redirect('/');
  // } else if (session !== null && path === '/dashboard') {
  //   redirect('/dashboard');
  // }

  return (
    <>
      <h1>NudgeBudge</h1>
    </>
  );
}
