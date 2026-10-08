import Image from "next/image";
import styles from "./Home.module.css";
import Header from "./Header";
import Banner from "./Banner";
import CompanyLogos from "./CompanyLogos";
import HowItWorks from "./HowItWorks";

import { FirstLogoUrlArray, SecondLogoUrlArray } from "@/app/lib/static/LogoUrlArrays"
import { InfoCards } from "@/app/lib/static/InfoCards";
import JobsDisplay from "./JobsDisplay";
import { JobCards } from "@/app/lib/static/SampleJobCards";

export default function Home() {
  return <>
    <Header />
    <Banner />
    <CompanyLogos firstLogoUrlArray={FirstLogoUrlArray} secondLogoUrlArray={SecondLogoUrlArray} />
    <HowItWorks
      title={"How Osaka DEV Works"}
      content={"Getting your dream job in Japan shouldn't be complicated. Here's how it works:"}
      infoCards={InfoCards}
    />
    <JobsDisplay jobCards={JobCards} />
  </>;
}
