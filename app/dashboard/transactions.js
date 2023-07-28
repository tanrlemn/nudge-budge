export default async function Transactions({ plaid_items, session }) {
  const fetchTransactions = async (access_token) => {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_token: access_token, session: session }),
    });
    const { transactions } = await response.json();
    console.log(transactions);

    return transactions;
  };

  return (
    <div>
      <h1>Transactions</h1>
      {plaid_items && plaid_items.length > 0 && (
        <>
          {plaid_items.map(async (item) => {
            const access_token = item.access_token;
            const transactions = await fetchTransactions(access_token);
            return (
              <div>
                <h2>{item.item_id}</h2>
                {transactions.map((transaction) => {
                  return (
                    <div>
                      <p>{transaction.name}</p>
                      <p>{transaction.amount}</p>
                      <p>{transaction.date}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
