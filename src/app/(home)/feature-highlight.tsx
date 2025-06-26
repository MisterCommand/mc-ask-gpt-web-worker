import { Code, Command, SlidersHorizontal } from "lucide-react";

const FeatureHighlight = () => {
  return (
      <div className="container">
        <p className="mb-4 text-sm text-muted-foreground lg:text-base">
          Empowering Your Minecraft Server
        </p>
        <h2 className="text-3xl font-medium lg:text-4xl">Features</h2>
        <div className="mt-14 grid gap-6 lg:mt-14 lg:grid-cols-3">
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Command className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">One-command Setup</h3>
            <p className="leading-7 text-muted-foreground">
                Set up the plugin using one command through our free hosted API. Or bring your own key.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <SlidersHorizontal className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Quota Control</h3>
            <p className="leading-7 text-muted-foreground">
              Control how many times your players can ask with a quota system.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Code className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Open Source</h3>
            <p className="leading-7 text-muted-foreground">
              The plugin is open source, so you can see how it works and contribute to it.
            </p>
          </div>
        </div>
      </div>
  );
};

export { FeatureHighlight };
