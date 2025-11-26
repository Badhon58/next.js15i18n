"use client";
import React from "react";
import { DoctorProfile } from "./Interface";
import { useTranslation } from "react-i18next";

const DoctorListProfile = ({ data }: { data: DoctorProfile }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-start w-full sm:flex-row min-h-[20vh]">
      <div className="relative rounded-full size-36 ">
        <img
          src={data.image || "/MediServices/Doctor.svg"}
          alt={data.firstName}
          width={140}
          height={140}
          className="w-full h-full rounded-full border-[1.5px] border-[#EB148C]"
        />
        <img
          src="/other/doctorbadge.svg"
          alt="Doctor badge"
          width={20}
          height={20}
          className="absolute -right-0 top-[65%]"
        />
      </div>
      <div className="md:ml-4 mt-1.5 lg:w-[70%]  w-9/12">
        <p className="text-[#EB148C] text-lg font-medium">
          {data?.firstName} {data?.lastName}
        </p>
        <p className="text-[#6B7588] text-sm font-normal">
          {data.bmdcRegistered && `BMDC No: ${data.bmdc}`}
        </p>
        <p className="text-[#6B7588] text-sm font-normal break-words">
          {data.category.map((item, index) => (
            <span key={index} className="mr-2">
              {item.name}
            </span>
          ))}
          <span>( {data.degree} )</span>
        </p>
        <p className="text-[#6B7588] text-sm font-normal">
          {data.yearsOfExperience} years experience overall
        </p>
        <p className=" flex space-x-6">
          <span>{t("consultationFee")}</span>
          <span>
            {t("moneyCount", {
              count: data.visitFee,
            })}
          </span>
        </p>
        <hr className="my-1 w-[50%] border border-dashed border-gray-400" />
        {/* <p className="flex items-center gap-2 mt-2 ">
          <span className="bg-[#06C270] bg-opacity-70 text-white p-1 px-2 rounded-lg font-medium">
            👍 99%
          </span>
          <span className="text-base text-[#16020B] font-medium">
            93 Patient Stories
          </span>
        </p> */}
      </div>
    </div>
  );
};

export default DoctorListProfile;
