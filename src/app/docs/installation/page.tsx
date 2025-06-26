import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import Requirements from "./requirements";
import GetCode from "./get-code";

export default function DocsPage() {
  return (
    <article className="prose dark:prose-invert prose-sm">
      <h1>Installation Guide</h1>
      <p>
        Welcome to the official installation guide for <strong>Ask GPT</strong>,
        a Spigot plugin that brings powerful AI chat capabilities to your
        Minecraft server. Follow the steps below to get started!
      </p>

      <h2>Requirements</h2>
      <Requirements />

      <h2>Download</h2>
      <InteractiveHoverButton>Download from SpigotMC</InteractiveHoverButton>

      <h2>Installation Steps</h2>

      <p>
        1. Stop your Minecraft server if it is running. <br />
        2. Place the downloaded <code>AskGPT.jar</code> file into your
        server&apos;s <code>plugins</code> folder. <br />
        3. Start your server. The plugin will generate a configuration file on
        first launch.
      </p>

      <h2>Configuration</h2>
      <p>
        After the first launch, edit the <code>plugins/AskGPT/config.yml</code>{" "}
        file to add your API key and adjust settings:
      </p>
      <GetCode />

      <h2>Usage</h2>
      <p>Players can use the plugin in-game by typing:</p>
      <pre>/ask What is the capital of France?</pre>
      <p>The plugin will respond in chat with an answer from GPT.</p>

      <h2>Support</h2>
      <p>
        Need help or want to report a bug? Visit our{" "}
        <a href="#">GitHub Issues</a> page or join our{" "}
        <a href="#">Discord server</a> for community support.
      </p>
    </article>
  );
} 