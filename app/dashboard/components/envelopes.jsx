'use client';

// styles
import textStyles from '@/app/styles/typography.module.css';
import spacingStyles from '@/app/styles/spacing.module.css';
import styles from '../styles/dashboard.module.css';

// hooks
import { useEffect, useState } from 'react';

export default function Envelopes() {
  const [envelopes, setEnvelopes] = useState(null);
  const [envelopesBalance, setEnvelopesBalance] = useState(0);

  useEffect(() => {
    const fetchEnvelopes = async () => {
      const response = await fetch('/api/envelopes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { envelopes } = await response.json();

      setEnvelopes(await envelopes);
    };

    const calculateEnvelopesBalance = () => {
      let balance = 0;
      envelopes.map((item) => {
        balance += item.amount;
      });
      setEnvelopesBalance(balance);
    };

    if (envelopes === null) {
      fetchEnvelopes();
    }

    if (envelopes !== null) {
      calculateEnvelopesBalance();
    }
  }, [envelopes]);

  return (
    <div>
      <div className={styles.envelopesHeaderWrap}>
        <h2>Envelopes</h2>
      </div>
      {envelopes && envelopes.length > 0 && (
        <>
          <div className={spacingStyles.marginBottomSm}>
            <p className={textStyles.smallBalance}>
              Balance for all envelopes:{' '}
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(envelopesBalance)}
            </p>
          </div>
          {envelopes.map((item) => {
            return (
              <div key={item.id}>
                <p>{item.name}</p>
                <p>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(item.amount)}
                </p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
