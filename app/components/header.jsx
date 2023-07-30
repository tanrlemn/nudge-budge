// styles
import styles from './styles/header.module.css';

// server
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// components
import Image from 'next/image';
import Link from 'next/link';

// local components
import Auth from './handleAuth';
import ModeToggle from './modeToggle';

export default async function Header() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase.from('profiles').select();
  const profileData = data !== null ? data[0] : null;

  return (
    <div className={styles.headerWrap}>
      <Link href={'/'}>
        <div>NudgeBudge</div>
      </Link>
      <div className={styles.headerButtonsWrap}>
        {/* <ModeToggle /> */}
        {session !== null && profileData !== null && (
          <Link
            href={'/dashboard'}
            className={styles.headerProfileWrap}>
            <div className={styles.headerProfileImageWrap}>
              <Image
                className={styles.headerProfileImage}
                src={profileData.profile_img_url}
                alt='profile image'
                width={30}
                height={30}
              />
            </div>
            <div className={styles.headerProfileName}>
              {profileData.first_name}
            </div>
          </Link>
        )}
        <Auth loggedIn={session !== null} />
      </div>
    </div>
  );
}
