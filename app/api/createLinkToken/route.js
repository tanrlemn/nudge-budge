import { plaidClient } from '@/app/lib/plaid';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  const tokenResponse = await plaidClient.linkTokenCreate({
    user: { client_user_id: process.env.PLAID_CLIENT_ID },
    client_name: 'NudgeBudge',
    language: 'en',
    products: ['auth'],
    country_codes: ['US'],
    redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
  });
  return NextResponse.json(tokenResponse.data);
}
