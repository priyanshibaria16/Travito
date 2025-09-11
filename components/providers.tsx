'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { Session } from 'next-auth';

type ProvidersProps = {
  children: ReactNode;
  session: Session | null | undefined;
};

export function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60} refetchWhenOffline={false}>
      {children}
    </SessionProvider>
  );
}
