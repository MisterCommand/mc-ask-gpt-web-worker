import GoogleSignIn from "@/components/google-signin";
import { CopyButton } from "@/components/ui/copy-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getSubscription, getUser } from "@/lib/db/queries";
import { ArrowRight, Server } from "lucide-react";
import Link from "next/link";

export default async function GetCode() {

    const user = await getUser();
    let key = "";

    if (user) {
        const subscription = await getSubscription(user);
        if (subscription && subscription.keys.length > 0) {
        key = subscription.keys[0].key;
        }
    }


  return (
    <div id="get-code">
      <Card>
        <CardHeader className="flex flex-row items-center gap-3 pb-2">
          <Server className="text-primary size-6" />
          <CardTitle>Get Server Command</CardTitle>
        </CardHeader>
        <CardContent>
            {key ? (
                <>
                    <p className="mb-2">
                        Run this command to connect <br></br> <code>/ask connect {key}</code> <CopyButton text={`/ask connect ${key}`} />
                    </p>
                    <Link href="/dashboard" className="text-sm text-muted-foreground flex gap-1 items-center">Manage usage <ArrowRight className="h-4 w-4" /></Link>
                </>
            ) : (
                <>
                    <p className="mb-2">
                        Sign up a free account to connect to a LLM provider. No credit card required.
                    </p>
                    <GoogleSignIn redirectUrlComplete="/docs/installation#get-code" />
                </>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
