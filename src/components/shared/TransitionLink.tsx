'use client';

import Link from 'next/link';
import { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { useNavigation } from '@/lib/navigation';

interface TransitionLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children: ReactNode;
}

export default function TransitionLink({ href, onClick, children, ...rest }: TransitionLinkProps) {
  const { navigate, isPending, pendingHref } = useNavigation();
  const isThisPending = isPending && pendingHref === href;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <Link href={href} onClick={handleClick} aria-busy={isThisPending || undefined} {...rest}>
      {children}
    </Link>
  );
}
