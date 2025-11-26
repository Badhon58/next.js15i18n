"use client";
import { EndPoint, Methods } from "@/api/config";
import { apiCall } from "@/lib/axios-client";
import React, { useEffect, useState } from "react";
import { DatePicker, Modal } from "rsuite";
import { MetaData, User } from "./interface";
import moment from "moment";
import PageLoading from "../Seo/PageLoading";
import { toast } from "react-toastify";
import { formatTime } from "@/lib/Helper";

const G_D_Iplane = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [allUser, setAllUser] = useState<User[]>([]);
  const [singleUser, setSingleUser] = useState<User | null>(null);
  const [secondModel, setSecondModel] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [sampleCollectionTime, setSampleCollectionTime] = useState<Date | null>(
    new Date()
  );
  const [sampleCollectionDate, setSampleCollectionDate] = useState<Date | null>(
    new Date()
  );
  const [buttonloading, setButtonloading] = useState(false);
  const [greenDelta, setGreenDelta] = useState<MetaData[]>();

  const init = async () => {
    try {
      setInitialLoading(true);
      const response = await apiCall(
        Methods.GET,
        `${EndPoint.G_DELTA_I_CALL_GET}`
      );
      if (response.success) {
        setGreenDelta(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleModelOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModelOpen(!modelOpen);
  };

  const handleClose = (e: any) => {
    setModelOpen(!modelOpen);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setInputValue(value);
    try {
      setLoading(true);
      const response = await apiCall(
        Methods.GET,
        `${EndPoint.USER_GETALL}?phone=${value}&page=1`
      );
      if (response.success) {
        setAllUser(response.data.userData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>, item: User) => {
    e.preventDefault();
    setSingleUser(item);
    setSecondModel(!secondModel);
  };

  const handleSecoundmodel = () => {
    setSecondModel(!secondModel);
  };

  const handleDateChange = (value: Date | null) => {
    if (value) {
      // const formattedDate = moment(value).format("YYYY-MM-DD");
      setSampleCollectionDate(value);
    } else {
      setSampleCollectionDate(null);
    }
  };

  // handle Time Changed
  const handleTimeChange = (value: Date | null) => {
    if (value) {
      // const formattedTime = moment(value).format("hh:mm A");
      setSampleCollectionTime(value);
    } else {
      setSampleCollectionTime(null);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setButtonloading(true);
      if (!status) {
        toast.warning("Status Is required");
        return;
      }
      let newDate = moment(sampleCollectionDate).format("YYYY-MM-DD");
      let newTime = moment(sampleCollectionTime).format("HH:mm:ss");
      console.log(newTime);

      let dateTime = `${newDate}T${newTime}`;
      let finaldata = {
        patientId: singleUser?._id,
        status: status,
        dateTime: dateTime,
      };
      const response = await apiCall(
        Methods.POST,
        `${EndPoint.G_DELTA_I_CALL_POST}`,
        finaldata
      );
      if (response.success) {
        setModelOpen(!modelOpen);
        setSecondModel(!secondModel);
        setSingleUser(null);
        setAllUser([]);
        init();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setButtonloading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return initialLoading ? (
    <PageLoading />
  ) : (
    <section className="xl:container xl:mx-auto min-h-[85vh] p-6 shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)]">
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium">Green Delta IPlane</p>
        <button
          onClick={handleModelOpen}
          className="flex items-center space-x-2 px-4 py-1.5 rounded-md border-[#E2136E] bg-[#E2136E] text-white font-medium text-sm "
        >
          Create
        </button>
      </div>

      {greenDelta && greenDelta?.length > 0 ? (
        <>
          <div className="grid grid-cols-5 place-content-center gap-3 text-center border bg-gray-100 mt-3">
            <p className="p-3">User</p>
            <p className="p-3 border-x">Doctor</p>
            <p className="p-3">Date</p>
            <p className="p-3 border-x">Time</p>
            <p className="p-3">Status</p>
          </div>
          {greenDelta.map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-5 place-content-center gap-3 text-center border-x border-b "
              >
                <div className="p-3 text-sm">
                  <p>
                    {item.patientId.firstName} {item.patientId.lastName}
                  </p>
                  <p>{item.patientId.phone}</p>
                </div>
                <p className="p-3 border-x">
                  {" "}
                  {item.doctorId.firstName} {item.doctorId.lastName}
                </p>
                <p className="p-3">
                  {/* {formatTime(new Date(item.dateTime))} */}
                  {moment(item.dateTime).format("DD-mm-yyyy")}
                  {/* {new Date(item.dateTime).toDateString()} */}
                </p>
                <p className="p-3 border-x">
                  {/* {moment(item.dateTime).format("DD-mm-yyyy")} */}
                  {moment.utc(item.dateTime).format("hh:mm:ss A")}
                </p>
                <p className="p-3">{item.status}</p>
              </div>
            );
          })}
        </>
      ) : (
        "No Data Found"
      )}

      <Modal open={modelOpen} onClose={handleClose} size={"lg"}>
        <Modal.Header>G_D_I Plane Create</Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col col-span-2">
              <label htmlFor="">Search User</label>
              <input
                type="text"
                className="outline-none p-2 border rounded-lg"
                value={inputValue}
                onChange={handleChange}
                name="user"
                placeholder="Enter Mobile Number"
              />
            </div>
            <p className="text-lg font-medium">User Info</p>
            <div className=" col-span-2 max-h-[40vh] overflow-auto w-full ">
              <div className="grid grid-cols-4 bg-gray-100 text-center">
                <p className=" p-3">Full Name</p>
                <p className="border-x  p-3">Phone </p>
                <p className=" p-3">Organigation</p>
                <p className="border-l  p-3">Option</p>
              </div>
              {loading
                ? "Loading..."
                : allUser?.map((item, index) => {
                    return (
                      <div
                        className="grid grid-cols-4 text-center border-b border-x"
                        key={index}
                      >
                        <p className="p-3">
                          {item.firstName} {item.lastName}
                        </p>
                        <p className="border-x p-3 ">{item.phone} </p>
                        <p className="p-3 border-r">{item.organization}</p>
                        <div className="flex items-center justify-center">
                          <button
                            onClick={(e) => handleEdit(e, item)}
                            className="flex items-center space-x-2 px-4 py-1.5 rounded-md border-[#E2136E] bg-[#E2136E] text-white font-medium text-sm "
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal open={secondModel} onClose={handleSecoundmodel} size={"lg"}>
        <Modal.Header>G_D_I Plane Edit</Modal.Header>
        <Modal.Body>
          <label htmlFor="" className=" font-medium text-lg pt-5 ">
            Patient Info
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className=" w-full">
              <label htmlFor="">First Name</label>
              <p className="p-2 border rounded-md">{singleUser?.firstName}</p>
            </div>

            <div className=" w-full">
              <label htmlFor="">Last Name</label>
              <p className="p-2 border rounded-md">{singleUser?.lastName}</p>
            </div>

            <div className=" w-full">
              <label htmlFor="">Selete Date</label>
              <DatePicker
                format="MM/dd/yyyy"
                className="w-full"
                placeholder="00-00-00"
                onChange={handleDateChange}
                value={sampleCollectionDate}
              />
            </div>
            <div className=" w-full">
              <label htmlFor="">Selete Time</label>
              <DatePicker
                format="HH:mm"
                showMeridiem
                className="w-full"
                placeholder="00:00"
                onChange={handleTimeChange}
                value={sampleCollectionTime}
              />
            </div>
            <div className=" w-full">
              <label htmlFor="">Organigation</label>
              <p className="p-2 border rounded-md">
                {singleUser?.organization}
              </p>
            </div>
            <div>
              <label htmlFor="note">Status: </label>
              <select
                className="w-full p-2 outline-none border rounded-md"
                name="note"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Consulted">Consulted</option>
                <option value="Not Received">Not Received</option>
                <option value="Rejected">Rejected</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="col-span-2 flex justify-end items-center">
              <button
                onClick={handleSubmit}
                disabled={buttonloading}
                className="flex items-center space-x-2 px-4 py-1.5 rounded-md border-[#E2136E] bg-[#E2136E] text-white font-medium text-sm "
              >
                {buttonloading ? "Loading.." : " Submit"}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default G_D_Iplane;
