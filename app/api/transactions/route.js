import { plaidClient, sessionOptions } from '../../lib/plaid';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const req = await request.json();

  const supabase = createRouteHandlerClient({ cookies });

  const { access_token, session } = req;

  const response = await plaidClient.transactionsSync({
    access_token,
  });
  const transactions = response.data.transactions;
  return NextResponse.json(transactions);
}
