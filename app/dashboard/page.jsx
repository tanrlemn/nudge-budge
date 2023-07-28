import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Transactions from './transactions';
import PlaidLink from './plaidLink';

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session === null) {
    redirect('/');
  }

  const { data } = await supabase.from('profiles').select();
  const { plaid_items } = data[0];
  return (
    <>
      <h1>Hello, {session.user.email}</h1>
      <pre>{JSON.stringify(data[0], null, 2)}</pre>

      <Transactions
        session={session}
        plaid_items={plaid_items}
      />
      <PlaidLink session={session} />
    </>
  );
}
