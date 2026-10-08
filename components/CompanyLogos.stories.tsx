import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import CompanyLogos from "./CompanyLogos";

import { FirstLogoUrlArray, SecondLogoUrlArray } from "@/app/lib/static/LogoUrlArrays";

const meta = {
  title: "CompanyLogos",
  component: CompanyLogos,
  tags: ["autodocs"],
} satisfies Meta<typeof CompanyLogos>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    firstLogoUrlArray: FirstLogoUrlArray,
    secondLogoUrlArray: SecondLogoUrlArray,
  }
};
