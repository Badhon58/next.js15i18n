import { Suspense } from "react";
import Loading from "./loading";
import Services from "@/components/Home/Services";
import Hero from "./Hero";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="lg:-mt-4">
        <Services />
      </div>
      <Hero />
    </Suspense>
  );
};

export default page;
