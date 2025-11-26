import { Suspense } from "react";
import Loading from "./loading";
import Hero from "@/components/Home/Hero";
import Services from "@/components/Home/Services";
import Packages from "@/components/Home/Packages";
import Whoweare from "@/components/Home/Whoweare";
import Doctors from "@/components/Home/Doctors";
import Specialize from "@/components/Home/Specialize";
import Blog from "@/components/Home/Blog";
import Client from "@/components/Home/Client";
import Diagnosis from "@/components/Home/Diagnosis";
import Download from "@/components/Home/Download";
import Question from "@/components/Home/Question";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Seopage from "@/components/Seo/Seopage";
import Color from "@/components/Home/Color";
import Partner from "@/components/Home/Partner";
export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navbar />
      </Suspense>
      <section className="overflow-hidden">
        <Color />
        <Hero />
        <Services />
        <Packages />
      </section>
      <Whoweare />
      <Doctors />
      <Specialize />
      <Partner />
      <Blog />
      <Client />
      <Diagnosis />
      <Question />
      <Download />
      <Footer />
      <Seopage />
    </>
  );
}
