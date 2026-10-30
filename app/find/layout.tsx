import FindPageBanner from "@/components/FindPageBanner";
import Header from "@/components/Header";

export default function Layout({ children }: LayoutProps<"/">) {
  return <>
    <Header selectedTab="Find Jobs" />
    <FindPageBanner />
    {children}
  </>;
}