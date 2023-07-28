import { plaidClient, sessionOptions } from '../../lib/plaid';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const req = await request.json();

  const { access_token } = req;

  const response = await plaidClient.transactionsSync({
    access_token,
    count: 30,
  });

  const transactions = response.data.added;
  console.log(transactions);
  return NextResponse.json({ transactions });
}
