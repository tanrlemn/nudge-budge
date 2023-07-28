'use client';

import { useEffect, useState } from 'react';

export default function Transactions({ plaid_items, session }) {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    const fetchTransactions = async (access_token) => {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: access_token }),
      });
      const { transactions } = await response.json();
      console.log(transactions);

      return transactions;
    };

    if (plaid_items && transactions === null) {
      console.log('plaid_items', plaid_items);
      plaid_items.map(async (item) => {
        console.log('item', item);
        const access_token = item.access_token;
        const itemTransactions = await fetchTransactions(access_token);
        setTransactions(await itemTransactions);
      });
    }
  }, [plaid_items]);

  return (
    <div>
      <h2>Transactions</h2>
      {transactions && transactions.length > 0 && (
        <>
          {transactions.map((item) => {
            return (
              <div>
                <div>
                  <p>{item.name}</p>
                  <p>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(item.amount)}
                  </p>
                  <p>{new Date(item.date).toDateString()}</p>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
