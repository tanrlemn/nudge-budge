'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';

export default function PlaidLink({ session }) {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch('/api/createLinkToken', {
        method: 'POST',
      });
      const { link_token } = await response.json();
      setToken(link_token);
    };
    createLinkToken();
  }, []);

  useEffect(() => {
    if (token) {
      console.log('token', token);
    }
  }, [token]);

  const onSuccess = useCallback(async (publicToken) => {
    const response = await fetch('/api/exchangePublicToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_token: publicToken, session: session }),
    });

    router.refresh();
  }, []);

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
  });

  return (
    <button
      onClick={() => open()}
      disabled={!ready}>
      <strong>Link a bank account</strong>
    </button>
  );
}
