import { Metadata } from 'next';
import { getServerAuthSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'My Trips | Travito',
  description: 'View and manage your upcoming and past trips with Travito.',
};

export default async function TripsPage() {
  const session = await getServerAuthSession();
  
  // Redirect to sign-in if not authenticated
  if (!session) {
    redirect('/auth/signin?callbackUrl=/trips');
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">My Trips</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Upcoming Trips</h2>
          <div className="bg-card p-6 rounded-lg border">
            <p className="text-muted-foreground">
              You don't have any upcoming trips. Start planning your next adventure!
            </p>
            <Button className="mt-4" asChild>
              <Link href="/explore">Explore Destinations</Link>
            </Button>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Past Trips</h2>
          <div className="bg-card p-6 rounded-lg border">
            <p className="text-muted-foreground">
              You haven't taken any trips with us yet.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

// Import Button and Link at the top of the file
import { Button } from '@/components/ui/button';
import Link from 'next/link';
