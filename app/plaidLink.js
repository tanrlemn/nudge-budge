'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';

export default function PlaidLink() {
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

  const onSuccess = useCallback(async (publicToken) => {
    await fetch('/api/exchangePublicToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_token: publicToken }),
    });
    router.push('/dashboard');
  }, []);

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
  });

  return (
    <button
      onClick={() => open()}
      disabled={!ready}>
      <strong>Link account</strong>
    </button>
  );
}
