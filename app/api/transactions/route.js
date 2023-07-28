import { plaidClient, sessionOptions } from '../../lib/plaid';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const access_token = request.body.access_token;
  const response = await plaidClient.transactionsSync({
    access_token,
  });
  const transactions = response.data.transactions;
  return NextResponse.json(transactions);
}
