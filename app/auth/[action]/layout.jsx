'use client';

// styles
import textStyles from '@/app/styles/typography.module.css';
import spacingStyles from '@/app/styles/spacing.module.css';
import styles from '../styles/auth.module.css';

// server
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// hooks
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthLayout({ children, params }) {
  const { action } = params;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
    router.push('/dashboard');
  };

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
    router.push('/auth/callback');
  };

  const actionName = action === 'login' ? 'Sign in' : 'Sign up';
  const actionFunction = action === 'login' ? handleSignIn : handleSignUp;
  return (
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
  );
}
