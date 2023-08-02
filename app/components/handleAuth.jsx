'use client';

// styles
import textStyles from '@/app/styles/typography.module.css';
import spacingStyles from '@/app/styles/spacing.module.css';
import styles from './styles/header.module.css';

// hooks
import { useRouter } from 'next/navigation';

export default function Auth({ loggedIn }) {
  const router = useRouter();

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
    </>
  );
}
