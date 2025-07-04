"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

type Props = {
  href: string;
};

export default function HeaderLink({
  href,
  children,
}: PropsWithChildren<Props>) {
  const pathname = usePathname();

  return (
    <Link href={href} className={clsx(pathname === href && "underline")}>
      {children}
    </Link>
  );
}
