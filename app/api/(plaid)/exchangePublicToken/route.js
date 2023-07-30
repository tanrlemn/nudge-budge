import { plaidClient, sessionOptions } from '../../../lib/plaid';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const req = await request.json();

    const { public_token, session } = req;

    const response = await plaidClient.itemPublicTokenExchange({
      public_token: public_token,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    if (accessToken && itemId) {
      const supabase = createRouteHandlerClient({ cookies });

      const plaid_items = async () => {
        const { data } = await supabase
          .from('profiles')
          .select('plaid_items')
          .eq('user_id', session.user.id);
        return data[0].plaid_items;
      };

      const updatedPlaidItems = async () => {
        const items = await plaid_items();
        if (items !== null) {
          return [...items, { access_token: accessToken, item_id: itemId }];
        } else {
          return [{ access_token: accessToken, item_id: itemId }];
        }
      };

      const { data } = await supabase
        .from('profiles')
        .update({
          plaid_items: await updatedPlaidItems(),
        })
        .eq('user_id', session.user.id)
        .select();

      return NextResponse.json({ data, itemId, accessToken });
    }
    return NextResponse.json({ accessToken, itemId });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
