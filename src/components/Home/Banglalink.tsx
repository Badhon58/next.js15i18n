import Image from "next/image";
import React from "react";

const Banglalink = () => {
  return (
    <div
      className={` text-black  rounded-md  min-h-[70vh] max-h-[75vh] md:min-h-[68vh] md:max-h-[69vh] 2xl:mx-auto 2xl:w-[94%]`}
    >
      <div className="hidden w-full h-full md:block">
        <Image
          src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-21102025T105220-1860-x-620.png"
          alt="Banglalink Web Banner"
          width={1500}
          height={600}
          quality={100}
          loading="eager"
          priority={true}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-contain rounded-lg md:min-h-[65vh] md:max-h-[80vh]"
        />
      </div>
      <div className="block w-full h-full md:hidden ">
        <Image
          src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-21102025T105239-342x465-bl.png"
          alt="Banglalink Responsive Web Banner"
          width={1000}
          height={270}
          loading="eager"
          priority={true}
          fetchPriority="high"
          rel="preload"
          decoding="async"
          className="min-h-[65vh] w-full h-full -z-10 lg:px-1.5 top-0 object-cover rounded-lg pt-0.5"
        />{" "}
      </div>
    </div>
  );
};

export default Banglalink;
