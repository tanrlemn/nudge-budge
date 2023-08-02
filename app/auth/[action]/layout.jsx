'use client';

// styles
import textStyles from '@/app/styles/typography.module.css';
import spacingStyles from '@/app/styles/spacing.module.css';
import styles from '../styles/auth.module.css';

// server
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// context
import { LoadingContext } from '@/app/context/LoadingContext';

// hooks
import { useState, useContext, Suspense } from 'react';
import { useRouter } from 'next/navigation';

// components
import Loading from '@/app/loading';

export default function AuthLayout({ children, params }) {
  const { loading, setLoading } = useContext(LoadingContext);
  const { action } = params;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    setLoading(true);
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
    router.push('/dashboard');
    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);

    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
    router.push('/auth/callback');
    setLoading(false);
  };

  const actionName = action === 'login' ? 'Sign in' : 'Sign up';
  const actionFunction = action === 'login' ? handleSignIn : handleSignUp;
  return (
    <Suspense fallback={<Loading />}>
      <main className={spacingStyles.mainWrap}>
        <div className={spacingStyles.marginBottomSm}>
          <h1>{actionName}</h1>
        </div>

        <div className={styles.buttonsWrap}>
          <input
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className={textStyles.input}
          />
          <input
            type='password'
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className={textStyles.input}
          />
          <button
            onClick={actionFunction}
            className={textStyles.headerButton}>
            {actionName}
          </button>
        </div>
        {children}
      </main>
    </Suspense>
  );
}
