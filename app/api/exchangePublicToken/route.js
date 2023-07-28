import { plaidClient, sessionOptions } from '../../lib/plaid';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const response = await plaidClient.itemPublicTokenExchange({
    public_token: request.body.public_token,
  });

  const accessToken = response.data.access_token;
  const itemId = response.data.item_id;

  return NextResponse.json({
    access_token: accessToken,
    item_id: itemId,
  });
}
