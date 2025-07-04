import Redirect from "@/components/redirect";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <SignedOut>
        <div className="flex h-screen w-screen items-center justify-center">
          <SignIn />
        </div>
      </SignedOut>
      <SignedIn>
        <Redirect path="/dashboard/organize" />
      </SignedIn>
    </>
  );
}
