import { NextResponse } from 'next/server';
import { getUser, getSubscription } from '@/lib/db/queries';
import { getQuota } from '@/lib/kv';

export async function GET() {
  try {
    // Get the current authenticated user
    const user = await getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the user's active subscription
    const subscription = await getSubscription(user);
    
    if (!subscription || !subscription.id) {
      // Return 0 if no subscription found
      return NextResponse.json({ quota: 0 });
    }

    try {
      // Get the quota from KV store using subscription ID
      const quota = await getQuota(subscription.id);
      return NextResponse.json({ quota: parseInt(quota) });
    } catch (error) {
      // Return 0 if quota not found in KV store
      console.error('Quota not found for subscription:', subscription.id, error);
      return NextResponse.json({ quota: 0 });
    }
  } catch (error) {
    console.error('Error fetching quota:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 