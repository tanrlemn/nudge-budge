// styles
import styles from './styles/header.module.css';

// server
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// components
import Link from 'next/link';
import Auth from './handleAuth';
import HeaderMenu from './headerMenu';
import ProfileMenu from './profileMenu';
import Logo from './logo';

export const dynamic = 'force-dynamic';

export default async function Header() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase.from('profiles').select();
  const profileData = data !== null ? data[0] : null;
  const logoLink = session !== null ? '/dashboard' : '/';

  return (
    <div className={styles.headerWrap}>
      <HeaderMenu session={session} />

      <Link
        href={logoLink}
        className={styles.logo}>
        <Logo />
      </Link>
      <div className={styles.headerButtonsWrap}>
        {session !== null && profileData !== null && (
          <ProfileMenu profileData={profileData} />
        )}
        <Auth loggedIn={session !== null} />
      </div>
    </div>
  );
}
