import React, { useEffect, useState } from "react";
import { NewProduct } from "./Interface";
import Link from "next/link";
import MediCart from "./MediCart";
import { dummyImageUrls } from "@/lib/Medicinelib";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, Methods } from "@/api/config";
import { Placeholder } from "rsuite";

const ParentsCatagoryProduct = ({ name }: { name: string }) => {
  const [AllProduct, setAllProduct] = useState<NewProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const init = async () => {
    try {
      setLoading(true);
      const firstResponse = await apiCall(
        Methods.GET,
        `${EndPoint.MEDICINE_GETALL}?page=${1}&parent_category_name=${name}`
      );
      const firstfilteredData = firstResponse.data.medInfo.filter(
        (item: NewProduct) => !dummyImageUrls.includes(item.images || "")
      );
      const firstdummyImages = firstResponse.data.medInfo.filter(
        (item: NewProduct) => dummyImageUrls.includes(item.images || "")
      );
      let combinedata = [...firstfilteredData];
      // if (name == "Medicines") {
      //   console.log("First Call");
      //   console.log(firstfilteredData);
      // }

      if (firstfilteredData.length < 12) {
        const secoundResponse = await apiCall(
          Methods.GET,
          `${EndPoint.MEDICINE_GETALL}?page=${2}&parent_category_name=${name}`
        );
        const secoundfilteredData = secoundResponse.data.medInfo.filter(
          (item: NewProduct) => !dummyImageUrls.includes(item.images || "")
        );
        const secounddummyImages = secoundResponse.data.medInfo.filter(
          (item: NewProduct) => dummyImageUrls.includes(item.images || "")
        );
        // if (name == "Medicines") {
        //   console.log("Secound Call");
        //   console.log(secoundfilteredData);
        // }
        combinedata = [...AllProduct, ...secoundfilteredData];
        if (secoundfilteredData.length < 15) {
          const thirdResponse = await apiCall(
            Methods.GET,
            `${EndPoint.MEDICINE_GETALL}?page=${3}&parent_category_name=${name}`
          );
          const thirdfilteredData = thirdResponse.data.medInfo.filter(
            (item: NewProduct) => !dummyImageUrls.includes(item.images || "")
          );
          const thirddummyImages = thirdResponse.data.medInfo.filter(
            (item: NewProduct) => dummyImageUrls.includes(item.images || "")
          );
          // if (name == "Medicines") {
          //   console.log("Third Call");
          //   console.log(combinedata);
          //   console.log(secoundfilteredData);
          //   console.log(thirdfilteredData);
          // }

          combinedata = [
            ...combinedata,
            ...secoundfilteredData,
            ...thirdfilteredData,
          ];
        }
      }
      // if (name == "Medicines") {
      //   console.log(combinedata);
      // }
      setAllProduct(combinedata);
      // console.log(combinedata);
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);
  return loading ? (
    <Placeholder.Paragraph rows={8} />
  ) : (
    <div className="grid grid-cols-2 gap-2 mt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 lg:gap-3 xl:gap-5 2xl:gap-6 ">
      {AllProduct?.map((item, index) => (
        <Link key={index} href={`mediMart/medicine/${item.product_slug}`}>
          <MediCart product={item} />
        </Link>
      ))}
    </div>
  );
};

export default ParentsCatagoryProduct;
