import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import HowItWorks from "./HowItWorks";
import { InfoCards } from "@/app/lib/static/InfoCards";

const meta = {
  title: "HowItWorks",
  component: HowItWorks,
  tags: ["autodocs"],
} satisfies Meta<typeof HowItWorks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "How Osaka DEV Works",
    content: "Getting your dream job in Japan shouldn't be complicated. Here's how it works:",
    infoCards: InfoCards,
  }
};
