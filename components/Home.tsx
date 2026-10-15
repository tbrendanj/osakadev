import Banner from "./Banner";
import CompanyLogos from "./CompanyLogos";
import HowItWorks from "./HowItWorks";
import Categories from "./Categories";

//TODO: A lot of this data should be queried out of the db!
import { FirstLogoUrlArray, SecondLogoUrlArray } from "@/app/lib/testing/fixtures/LogoUrlArrays"
import { HomeBannerText } from "@/app/lib/static/HomeBannerText";
import { InfoCards } from "@/app/lib/static/InfoCards";
import { HomeJobsDisplayHeaderTitle } from "@/app/lib/static/HomeJobsDisplayHeaderTitle";
import JobsDisplay from "./JobsDisplay";
import { JobCards } from "@/app/lib/testing/fixtures/SampleJobCards";
import { CategoryListings } from "@/app/lib/testing/fixtures/CategoryListings";

export default function Home() {
  return <>
    <Banner titleText={HomeBannerText.titleText} bannerText={HomeBannerText.bannerText} />
    <CompanyLogos firstLogoUrlArray={FirstLogoUrlArray} secondLogoUrlArray={SecondLogoUrlArray} />
    <HowItWorks
      title={"How Osaka DEV Works"}
      content={"Getting your dream job in Japan shouldn't be complicated. Here's how it works:"}
      infoCards={InfoCards}
    />
    <JobsDisplay jobCards={JobCards} title={HomeJobsDisplayHeaderTitle} />
    <Categories categories={CategoryListings} />
  </>;
}
