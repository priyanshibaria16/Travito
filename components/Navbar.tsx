'use client';

import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoading = status === 'loading';

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't show navbar on auth pages
  if (pathname.startsWith('/auth') || !isMounted) {
    return null;
  }

  // Show loading state
  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex-1">
            <div className="h-8 w-32 animate-pulse rounded-md bg-gradient-to-r from-muted/20 via-muted/40 to-muted/20" />
          </div>
        </div>
      </header>
    );
  }

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Tours', href: '/tours' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'My Trips', href: '/trips', requiresAuth: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image 
              src="/logo-new.svg" 
              alt="Travito Logo" 
              width={160} 
              height={40} 
              className="h-10 w-auto"
              priority
            />
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            {navLinks.map((link) => {
              if (link.requiresAuth && !session) return null;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-2 py-1.5 text-sm font-medium transition-colors hover:text-primary',
                    'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300',
                    'hover:after:w-full',
                    pathname === link.href ? 'text-primary' : 'text-foreground/80'
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile menu button */}
        <button
          className="ml-auto md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-foreground transition-transform ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-foreground transition-opacity ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block h-0.5 w-6 bg-foreground transition-transform ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}></span>
          </div>
        </button>

        <div className="ml-auto hidden items-center space-x-4 md:flex">
          {session ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                    {session.user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
                <span className="text-sm font-medium text-foreground/80">
                  {session.user?.name || session.user?.email?.split('@')[0]}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="border-primary/20 text-foreground/80 hover:bg-primary/5 hover:text-primary"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link 
                href="/auth/register"
                className={cn(
                  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors',
                  'h-9 px-4 text-foreground/80 hover:bg-primary/5 hover:text-primary',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  'disabled:pointer-events-none disabled:opacity-50'
                )}
              >
                Register
              </Link>
              <Link 
                href="/auth/signin"
                className={cn(
                  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors',
                  'h-9 px-4 bg-primary text-primary-foreground hover:bg-primary/90',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  'disabled:pointer-events-none disabled:opacity-50'
                )}
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t md:hidden">
          <div className="container py-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                if (link.requiresAuth && !session) return null;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 text-sm font-medium ${pathname === link.href ? 'text-primary' : 'text-foreground/80'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 border-t pt-4">
              {session ? (
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-3 px-4">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-base font-medium text-primary">
                        {session.user?.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {session.user?.name || 'User'}
                      </p>
                      <p className="text-xs text-foreground/60">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="w-full justify-start border-primary/20 text-foreground/80 hover:bg-primary/5 hover:text-primary"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full"
                  >
                    <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                      Register
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    asChild
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}