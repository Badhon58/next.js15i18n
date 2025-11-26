"use client";
import React, { useEffect, useState } from "react";
import { reportUpload } from "./Interface";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, FormDataHeader, JsonHeader, Methods } from "@/api/config";
import { toast } from "react-toastify";
import { getUserID } from "@/lib/authHandler";
import { Modal } from "rsuite";
import { AiOutlineDelete } from "react-icons/ai";
import Image from "next/image";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import "./Stepper.css";
import { useTranslation } from "react-i18next";
const ReportUpload = () => {
  const { t } = useTranslation();
  const [addreport, setAddreport] = useState(false);
  const [reportvalue, setReportvalue] = useState<reportUpload>({
    userId: "",
    title: "",
    desc: "",
    reportFile: [],
  });
  const [allReportValue, setAllReportValue] = useState<reportUpload[]>();
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [imageShow, setImageShow] = useState(false);

  const handleClose: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAddreport(!addreport);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file: any = e.target.files;
    const form = new FormData();
    form.append("file", file[0]);
    const response = await apiCall(
      Methods.POST,
      EndPoint.ADMIN_FILE_UPLOAD,
      form,
      FormDataHeader
    );
    if (response.success) {
      const Url = response?.data;
      if (Url) {
        setReportvalue((prev) => ({
          ...prev,
          reportFile: [...prev.reportFile, Url],
        }));
      }
    } else {
      toast.error("Something Went Wrong");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setReportvalue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = (indexToDelete: number) => {
    setReportvalue((prev) => ({
      ...prev,
      reportFile: prev.reportFile.filter((_, index) => index !== indexToDelete),
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      setBtnLoading(true);
      e.preventDefault();
      const response = await apiCall(
        Methods.POST,
        EndPoint.REPORTUPLOAD,
        reportvalue,
        JsonHeader
      );
      if (response.success) {
        toast.success(response.message);
        setAddreport(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBtnLoading(false);
      init();
    }
  };

  const init = async () => {
    try {
      setLoading(true);
      const userid: any = await getUserID();
      const response = await apiCall(
        Methods.GET,
        `${EndPoint.GETREPORTBYID}?userId=${userid}&page=1`
      );
      // console.log(response);
      setAllReportValue(response.data);
      setReportvalue((prev) => ({
        ...prev,
        userId: userid,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    init();
  }, []);

  const handleOpenReport = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAddreport(!addreport);
  };

  const handleShowLink = (
    e: React.MouseEvent<HTMLButtonElement>,
    fileLink: string
  ) => {
    // e.preventDefault();
    setFileUrl(fileLink);
    setImageShow(!imageShow);
  };

  const handleCloseLink: any = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImageShow(!imageShow);
  };

  return loading ? (
    "Loading..."
  ) : (
    <section className="min-h-full xl:container xl:mx-auto px-2 lg:pt-3 xl:pt-6  lg:px-2 xl:px-4 2xl:px-8 shadow-[6px_6px_25px_0px_rgba(16,_40,_81,_0.11)]">
      <div className="flex  items-center justify-between">
        <p className="2xl:text-2xl text-xl font-semibold">{t("Report")}</p>
        <button
          onClick={handleOpenReport}
          className="bg-[#EB148C] rounded-md text-white text-sm 2xl:text-base px-4 py-1.5"
        >
          {t("Upload Report")}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-3 mt-3">
        {allReportValue?.map((item, index) => {
          return (
            <div
              key={index}
              className=" text-gray-700 p-3 bg-white shadow-[0px_0px_10px_0px_rgba(0,_0,_0,_0.1)] bg-clip-border rounded-xl"
            >
              <div className="grid grid-cols-3 h-[200px] overflow-y-auto  text-gray-700  bg-clip-border rounded-xl">
                {item.reportFile.map((fileUrl, index) => (
                  <div key={index} className="px-2">
                    {fileUrl.endsWith(".pdf") ? (
                      <div className="relative group cursor-pointer">
                        <button
                          onClick={(e) => handleShowLink(e, fileUrl)}
                          className="eyebutton"
                        >
                          <IoMdEye size={20} className="text-white" />
                        </button>
                        <iframe
                          src={fileUrl}
                          className="w-20 h-20 border rounded-md object-cover "
                          style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                          }}
                          width={80}
                          height={80}
                          title={`PDF-${index}`}
                        />
                      </div>
                    ) : (
                      <div className="relative group cursor-pointer">
                        <button
                          onClick={(e) => handleShowLink(e, fileUrl)}
                          className="eyebutton"
                        >
                          <IoMdEye size={20} className="text-white" />
                        </button>
                        <Image
                          src={fileUrl}
                          alt={`Uploaded file ${index + 1}`}
                          width={80}
                          height={80}
                          className="w-20 h-20 border rounded-md object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                    {item.title}
                  </p>
                </div>
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        open={addreport}
        onClose={handleClose}
        size={"lg"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Modal.Header>
          <Modal.Title style={{ textAlign: "center", fontWeight: "600" }}>
            Upload Report
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className=" min-h-[60vh] min-w-[600px]">
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-3  min-h-[30vh]">
              {reportvalue.reportFile.map((item, index) => (
                <div key={index}>
                  <div className="relative">
                    <embed
                      src={item}
                      width={80}
                      height={30}
                      className="w-20 h-20 border rounded-md object-cover"
                    />
                    <button
                      onClick={() => handleDelete(index)}
                      className="absolute top-0 right-2 bg-gray-200 z-20 p-0.5 rounded-md"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              ))}
              <label
                htmlFor="reportUpload"
                className={`px-3 py-1 bg-gray-200 grid place-items-center rounded-lg h-20 w-20`}
              >
                <FaCloudUploadAlt size={40} />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  id="reportUpload"
                />
              </label>
            </div>
            <div className="mt-4">
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  // placeholder=""
                  placeholder={"Enter Title"}
                  className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C]  sm:text-sm"
                  value={reportvalue.title}
                  onChange={handleChange}
                  required
                  name="title"
                />
              </div>
              <div className=" mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  // placeholder=""
                  placeholder={"Enter Description"}
                  className="mt-1 block w-full outline-none border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#EB148C]  focus:border-[#EB148C]  sm:text-sm"
                  value={reportvalue.desc}
                  onChange={handleChange}
                  required
                  name="desc"
                  rows={4}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleSubmit}
            className="bg-[#EB148C] rounded-md text-white text-sm 2xl:text-base px-4 py-1.5"
          >
            {btnLoading ? "Loading..." : "Submit"}
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        open={imageShow}
        onClose={handleCloseLink}
        size={"lg"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          {fileUrl && (
            <embed
              src={fileUrl}
              width={400}
              height={500}
              className="min-w-[45rem] min-h-[45rem] border rounded-md "
            />
          )}
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default ReportUpload;
