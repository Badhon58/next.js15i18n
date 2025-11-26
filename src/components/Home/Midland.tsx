import Image from "next/image";
import React from "react";

const Midland = () => {
  return (
    <div
      className={`text-white  rounded-md  min-h-[70vh] max-h-[75vh] md:min-h-[68vh] md:max-h-[69vh] 2xl:mx-auto 2xl:w-[94%]`}
    >
      <div className="relative ">
        <div className="hidden w-full h-full md:block">
          <Image
            // src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-24042025T121653-clinicall-bongo-banner1.svg"
            // src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-17082025T130633-midland-banner-min.png"
            src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-07092025T170834-midland-bank-1860-x-620.png"
            alt="Midland Web Banner"
            width={1500}
            height={600}
            quality={100}
            loading="eager"
            priority={true}
            decoding="async"
            rel="preload"
            fetchPriority="high"
            className="min-h-[65vh] w-full h-full -z-10 px-1.5 top-0 object-contain rounded-lg pt-0.5"
          />
        </div>
        <div className="block w-full h-full md:hidden">
          <Image
            // src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-24082025T165445-responsive-midland-1.png"
            src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-07092025T170858-midland-bank-342-x-465.png"
            alt="Midland Responsive Web Banner"
            width={1200}
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

export default Midland;
