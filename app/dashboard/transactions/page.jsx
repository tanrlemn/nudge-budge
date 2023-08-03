// styles
import styles from '../styles/dashboard.module.css';

// server
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// components
import Transactions from '../components/transactions';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session === null) {
    redirect('/');
  }

  return (
    <div className={styles.dashboardWrap}>
      <Transactions />
    </div>
  );
}
