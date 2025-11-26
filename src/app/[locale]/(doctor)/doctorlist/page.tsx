import DoctorList from "@/components/Doctor/DoctorList";
import React, { Suspense } from "react";
import Loading from "./loading";
import DoctorFAQ from "@/components/Doctor/DoctorFAQ";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <DoctorList />
      <DoctorFAQ />
    </Suspense>
  );
};

export default page;
