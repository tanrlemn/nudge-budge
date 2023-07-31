import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect('/');
  }

  const { data, error } = await supabase
    .from('envelopes')
    .select()
    .order('priority_id', { ascending: false });

  const envelopes = data;
  return NextResponse.json({ envelopes, error });
}
