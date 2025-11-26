import Image from "next/image";
import React from "react";

const Brac = () => {
  return (
    <div
      className={` text-white  rounded-md  min-h-[70vh] max-h-[75vh] md:min-h-[68vh] md:max-h-[69vh] 2xl:mx-auto 2xl:w-[94%]`}
    >
      <div className="relative ">
        <div className="hidden w-full h-full md:block">
          <Image
            // src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-24042025T121653-clinicall-bongo-banner1.svg"
            // src="http://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-03082025T110651-brac2.svg"
            src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-14082025T164635-hero-2-image-min.png"
            alt="Brac Web Banner"
            width={1500}
            height={600}
            quality={100}
            loading="eager"
            priority={true}
            fetchPriority="high"
            decoding="async"
            className="min-h-[65vh] w-full h-full -z-10 px-1.5 top-0 object-contain rounded-lg pt-0.5"
          />
        </div>
        <div className="block w-full h-full md:hidden">
          <Image
            src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-10082025T190732-brac-banner-responsive.svg"
            alt="Brac Responsive Web Banner"
            width={1000}
            height={270}
            quality={100}
            loading="eager"
            priority={true}
            fetchPriority="high"
            decoding="async"
            rel="preload"
            className="min-h-[65vh] w-full h-full -z-10 px-1.5 top-0 object-fill rounded-lg pt-0.5"
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default Brac;
