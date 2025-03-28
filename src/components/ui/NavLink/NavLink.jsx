
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const linkClassName = 'transition-colors group-hover:text-blue-400';

export function NavLink(props) {
  const {
    children,
    href,
    className,
    shallow,
    prefetch,
  } = props;
  return (
    <Link
      className={cn(
        className,
        linkClassName,
      )}
      href={href}
      shallow={shallow}
      prefetch={prefetch}
    >
      {children}
    </Link>
  )
}
