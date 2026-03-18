import {Header} from "@/components/HomePageComponents/Header/Header";
import {Hero} from "@/components/HomePageComponents/Hero/Hero";
import {TrustedBy} from "@/components/HomePageComponents/TrustedBy/TrustedBy";
import {Product} from "@/components/HomePageComponents/Product/Product";
import {BigSection} from "@/components/HomePageComponents/BigSection/BigSection";
import {Section} from "@/components/HomePageComponents/Section/Section";
import {Start} from "@/components/HomePageComponents/Start/Start";
import {Footer} from "@/components/HomePageComponents/Footer/Footer";


export default function Home() {
  return (
    <>
      <Header/>
      <Hero/>
      <TrustedBy/>
      <Product/>
      <BigSection/>
      <Section style={'!p-[64px]'} bTop={true}>
          <div></div>
      </Section>
      <Start/>
      <Footer/>
    </>
  );
}
