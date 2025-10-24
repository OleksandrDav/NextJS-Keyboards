import Link from "next/link";
import { Fragment, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface BreadcrumbProps {
  children: ReactNode;
  className?: string;
}

interface BreadcrumbItemProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

interface BreadcrumbSeparatorProps {
  children?: ReactNode;
  className?: string;
}

export function Breadcrumb({ children, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm text-gray-500", className)}>
      <ol className="flex items-center gap-2">
        {children}
      </ol>
    </nav>
  );
}

export function BreadcrumbItem({ children, href, className }: BreadcrumbItemProps) {
  if (href) {
    return (
      <li>
        <Link href={href} className={cn("hover:underline", className)}>
          {children}
        </Link>
      </li>
    );
  }

  return (
    <li className={cn("text-gray-900", className)}>
      {children}
    </li>
  );
}

export function BreadcrumbSeparator({ children = "/", className }: BreadcrumbSeparatorProps) {
  return (
    <li aria-hidden className={cn("opacity-50", className)}>
      {children}
    </li>
  );
}