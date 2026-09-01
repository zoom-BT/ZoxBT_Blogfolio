'use client';

import { createContext, useContext, useState, useTransition, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface NavigationContextValue {
  isPending: boolean;
  pendingHref: string | null;
  navigate: (href: string) => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  const navigate = (href: string) => {
    setPendingHref(href);
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <NavigationContext.Provider value={{ isPending, pendingHref: isPending ? pendingHref : null, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
}
