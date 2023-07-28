export default async function Transactions({ publicToken }) {
  const fetchTransactions = async () => {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_token: 'accessToken' }),
    });
    const { transactions } = await response.json();
    console.log(transactions);

    return transactions;
  };

  return <div></div>;
}
