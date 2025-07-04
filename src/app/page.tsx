import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-8">
      <h1 className="text-lg font-semibold text-indigo-500">
        Spotify Liked Songs
      </h1>
      <div className="flex flex-col gap-4">
        <Button>
          <Link href={"/dashboard/organize"}>Dashboard</Link>
        </Button>
        <Button>
          <Link href={"/sign-in"}>Sign in</Link>
        </Button>
      </div>
    </main>
  );
}
