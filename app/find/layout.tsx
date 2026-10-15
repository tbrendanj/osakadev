import Header from "@/components/Header";

export default function Layout({ children }: LayoutProps<"/">) {
  return <>
    <Header selectedTab="Find Jobs" />
    {children}
  </>;
}