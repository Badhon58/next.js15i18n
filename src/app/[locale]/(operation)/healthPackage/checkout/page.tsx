import PackageCheckout from "@/components/Package/PackageCheckout";
import React, { Suspense } from "react";
import Loading from "../loading";

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <PackageCheckout />
    </Suspense>
  );
};

export default page;
