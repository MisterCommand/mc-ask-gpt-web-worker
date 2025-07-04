import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AuroraText } from "@/components/magicui/aurora-text";

interface Hero1Props {
  badge?: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image: {
    src: string;
    alt: string;
  };
}

const Hero1 = ({
  badge = "✨ Hosted API",
  description = "Free and open source Minecraft server plugin that allows players to ask AI in server chat.",
  buttons = {
    primary: {
      text: "Download",
      url: "https://www.google.com",
    },
    secondary: {
      text: "View on GitHub",
      url: "https://www.github.com",
    },
  },
  image = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    alt: "Hero section demo image showing interface components",
  },
}: Hero1Props) => {
  return (
    <div className="container">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {badge && (
            <Badge variant="outline">
              {badge}
              <ArrowUpRight className="ml-2 size-4" />
            </Badge>
          )}
          <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
            Bring <AuroraText>AI</AuroraText> to Your Server Chat
          </h1>
          <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
            {description}
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
            {buttons.primary && (
              <Button asChild className="w-full sm:w-auto">
                <a href={buttons.primary.url}>{buttons.primary.text}</a>
              </Button>
            )}
            {buttons.secondary && (
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a href={buttons.secondary.url}>
                  {buttons.secondary.text}
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
        <img
          src={image.src}
          alt={image.alt}
          className="max-h-96 w-full rounded-md object-cover"
        />
      </div>
    </div>
  );
};

export { Hero1 };
