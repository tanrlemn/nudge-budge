import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const req = await request.json();
  const { name, amount, notes } = req;

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
    .from('envelopes')
    .insert([
      {
        created_at: now,
        name: name,
        amount: amount,
        amount_left: amount,
        amount_spent: 0,
        notes: notes,
        user_id: session.user.id,
      },
    ])
    .select();

  const envelope = data;
  console.log(envelope);
  return NextResponse.json({ envelope, error });
}
