import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Hero1 } from "./(home)/hero";
import { Beam } from "./(home)/beam";
import { FeatureHighlight } from "./(home)/feature-highlight";
import { Providers } from "./(home)/providers";

export default function HomePage() {
  return (
    <main>
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Hero1
            description="Free and open source Minecraft server plugin that allows players to ask AI in server chat."
            image={{
              src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
              alt: "Hero section demo image showing interface components",
            }}
          />
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="my-6 text-pretty text-4xl font-bold lg:text-6xl text-center">
            Connect to any LLM Provider
          </h2>
          <Providers />
          <Beam />
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeatureHighlight />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl">
                Invite AI to your server chat
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Install the plugin and get started in minutes.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <a href="https://github.com/nextjs/saas-starter" target="_blank">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg rounded-full"
                >
                  Installation
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
