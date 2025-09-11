"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  
  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  // Don't show navbar on auth pages
  if (pathname?.startsWith('/auth')) {
    return null;
  }

  return (
    <nav className="bg-white shadow-md py-4 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">
        <Link href={"/"} className="flex items-center">
          <Image 
            src={"/logo.png"} 
            alt="Travito Logo" 
            width={40} 
            height={40} 
            className="rounded-full"
          />
          <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Travito
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          {session ? (
            <>
              <Link
                href={"/trips"}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                My Trips
              </Link>
              <Link
                href={"/globe"}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Globe
              </Link>
              <div className="relative group">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <span className="text-gray-700 font-medium">
                    {session.user?.name || 'Account'}
                  </span>
                  <svg 
                    className="w-5 h-5 text-gray-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/register"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Register
              </Link>
              <Link
                href="/auth/signin"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}