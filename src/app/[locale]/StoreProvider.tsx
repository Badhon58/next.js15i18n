"use client";
import LabAmount from "@/components/Lab/LabAmount";
import { makeStore, AppStore } from "@/redux/Store";
import React, { Suspense, useRef } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/lib/i18n";
import Loading from "./loading";
import MetaPixel from "@/components/common/MetaPixel";
const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return (
    <Provider store={storeRef.current}>
      <Suspense fallback={<Loading />}>
        <LabAmount />
        {children}
        <ToastContainer />
        <MetaPixel />
      </Suspense>
    </Provider>
  );
};

export default StoreProvider;
