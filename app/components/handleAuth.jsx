'use client';

// styles
import textStyles from '@/app/styles/typography.module.css';
import spacingStyles from '@/app/styles/spacing.module.css';
import styles from './styles/header.module.css';

// server
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// hooks
import { useRouter } from 'next/navigation';

export default function Auth({ loggedIn }) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      {!loggedIn && (
        <div className={styles.headerButtonsWrap}>
          <div className={spacingStyles.marginRightXs}>
            <button
              onClick={() => {
                router.push('/auth/login');
              }}
              className={textStyles.headerButton}>
              Sign in
            </button>
          </div>
          <button
            onClick={() => {
              router.push('/auth/signup');
            }}
            className={textStyles.headerButtonYellow}>
            Sign up
          </button>
        </div>
      )}
      {loggedIn && (
        <button
          onClick={handleSignOut}
          className={textStyles.headerButton}>
          Sign out
        </button>
      )}
    </>
  );
}
