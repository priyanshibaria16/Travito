'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isLoading = status === 'loading';

  // Don't show navbar on auth pages
  if (pathname.startsWith('/auth')) {
    return null;
  }

  // Show nothing while loading
  if (isLoading) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Travito</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/explore"
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === '/explore' ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              Explore
            </Link>
            {session && (
              <Link
                href="/trips"
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === '/trips' ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                My Trips
              </Link>
            )}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {session ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {session.user?.name || session.user?.email}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
                className="hidden sm:inline-flex"
              >
                <Link href="/auth/register">
                  Register
                </Link>
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                asChild
              >
                <Link href="/auth/signin">
                  Sign In
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}