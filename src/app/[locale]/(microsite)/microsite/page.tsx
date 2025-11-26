import Index from "@/components/Microsite/Index";
import PageLoading from "@/components/Seo/PageLoading";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <Index />
    </Suspense>
  );
};

export default page;
