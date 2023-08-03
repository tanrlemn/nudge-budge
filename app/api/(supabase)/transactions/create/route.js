import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const req = await request.json();
  const {
    account_id,
    amount,
    date,
    merchant_name,
    pending,
    category,
    envelope_id,
  } = req;

  console.log(req);

  const now = new Date();

  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect('/');
  }

  const { data, error } = await supabase
    .from('transactions')
    .insert([
      {
        created_at: now,
        account_id: account_id,
        amount: amount,
        date: date,
        merchant_name: merchant_name,
        pending: pending,
        category: category,
        envelope_id: envelope_id,
        user_id: session.user.id,
      },
    ])
    .select();

  const envelope = data;
  return NextResponse.json({ envelope, error });
}
