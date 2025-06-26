"use client";

import { useSignIn } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { OAuthStrategy } from "@clerk/types";

type GoogleSignInProps = {
    redirectUrlComplete?: string;
}

export default function GoogleSignIn({ redirectUrlComplete = "/" }: GoogleSignInProps) {
  const { signIn } = useSignIn();

  if (!signIn) return null;

    const signInWith = (strategy: OAuthStrategy) => {
      return signIn
        .authenticateWithRedirect({
            strategy,
            redirectUrl: "/sign-in/sso-callback",
            redirectUrlComplete: redirectUrlComplete,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err: Error) => {
            toast("We're having trouble signing you in. Please try again later.");
            console.error(err);
        });
    };

  return (
    <Button onClick={() => signInWith("oauth_google")}>
      <img
        className="w-6 h-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
      />
      <span>Login with Google</span>
    </Button>
  );
}