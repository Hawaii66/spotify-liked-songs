import HeaderLink from "@/components/HeaderLink";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense, type PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex flex-row items-center justify-between gap-4 px-12 py-4">
        <Link href="/dashboard">
          <h1 className="text-lg font-semibold text-purple-500">
            Spotify Tracker
          </h1>
        </Link>
        <HeaderLink href="/dashboard/organize">Organize</HeaderLink>
        <HeaderLink href="/dashboard/generate">Generate</HeaderLink>
        <div className="ml-auto">
          <UserButton />
        </div>
      </header>
      <Separator />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="flex items-center justify-center p-24">
              <Loader2 className="animate-spin" />
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
    </div>
  );
}
