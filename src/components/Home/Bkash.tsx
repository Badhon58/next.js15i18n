import Image from "next/image";
import React from "react";

const Bkash = () => {
  return (
    <div
      className={` text-black  rounded-md  min-h-[70vh] max-h-[75vh] md:min-h-[68vh] md:max-h-[69vh] 2xl:mx-auto 2xl:w-[94%]`}
    >
      <div className="hidden w-full h-full md:block">
        <Image
          src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-12082025T171831-1860x620pp.svg"
          alt="Bkash Web Banner"
          width={1500}
          height={600}
          quality={100}
          loading="eager"
          priority={true}
          fetchPriority="high"
          decoding="async"
          className=" w-full h-full -z-10 px-1.5  object-contain rounded-lg pt-0.5 md:min-h-[65vh] md:max-h-[80vh]"
        />
      </div>
      <div className="block w-full h-full md:hidden ">
        <Image
          src="https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-12082025T171854-bkash-banner-responsive.svg"
          alt="Bkash Responsive Web Banner"
          width={1000}
          height={270}
          quality={100}
          loading="eager"
          priority={true}
          fetchPriority="high"
          decoding="async"
          className="min-h-[65vh] w-full h-full -z-10 lg:px-1.5 top-0 object-cover rounded-lg pt-0.5"
        />{" "}
      </div>
    </div>
  );
};

export default Bkash;
// https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-14102025T125918-bkashwebimage.jpg
