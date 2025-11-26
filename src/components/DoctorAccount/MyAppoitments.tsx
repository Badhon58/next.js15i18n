"use client";
import { getDoctorId } from "@/lib/authHandler";
import React, { useEffect, useState } from "react";
import { Appointment } from "./interface";
import ScheduleList from "./ScheduleList";
import AddNewAppoitment from "./AddNewAppoitment";
import { apiCall } from "@/lib/axios-client";
import { EndPoint, FormDataHeader, Methods } from "@/api/config";
import PageLoading from "../Seo/PageLoading";
import { useSocket } from "@/context/SocketContext";
import { useRouter } from "next/navigation";
import { Toggle } from "rsuite";
import ToggleButton from "./ToggleButton";

const MyAppoitments = () => {
  const [upCommingAppoitments, setUpCommingAppoitments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { onlineUsers, makeCall } = useSocket();
  const router = useRouter();
  const [Checked, setIsChecked] = useState<boolean>(false);
  const [doctorId, setDoctorId] = useState<any>();
  const [doctorinfo, setDoctorinfo] = useState<any>();

  const init = async () => {
    try {
      setLoading(true);
      const doc_Id = await getDoctorId();
      setDoctorId(doc_Id);
      const response = await apiCall(
        Methods.GET,
        `${EndPoint.DOCTOR_UPCOMING_SCHEDULE}/${doc_Id}`
      );
      // console.log(response.data);

      const { data }: any = await apiCall(
        Methods.GET,
        `${EndPoint.DOCTOR_FIND_BY_ID}/${doc_Id}`
      );
      setIsChecked(data.isAvailable);
      setDoctorinfo(data);
      setUpCommingAppoitments(response.data);
      // setUpCommingAppoitments(sortedAppointments);
      // console.log("ONLINE USERS", onlineUsers);
      // console.log("Sorted Appointments", sortedAppointments);
      // set online
      // const updatedValue = sortedAppointments?.map((appointment: any) => {
      //   console.log("single appointment", appointment);
      //   const onlineUser = onlineUsers?.find(
      //     (user) => user.userId === appointment.user._id
      //   );
      //   console.log("UUUU", onlineUser);
      //   const isOnline = onlineUser ? true : false;
      //   const socketId = onlineUser ? onlineUser.socketId : null;
      //   return {
      //     ...appointment,
      //     isOnline,
      //     socketId,
      //   };
      // });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    init();
  }, [onlineUsers]);
  // useEffect(() => {
  //   init();
  // }, []);

  const handleMakeCall = (onlineUser: any, fcm_token?: any) => {
    // console.log("TTTT", onlineUser, fcm_token);
    makeCall(onlineUser, fcm_token);
    router.push("/consultation");
  };
  // Again Call to appoitment

  // console.log("Upcomming Appointments", upCommingAppoitments);
  return loading ? (
    <PageLoading />
  ) : (
    <section className="xl:container xl:mx-auto min-h-[80vh] shadow-[6px_6px_35px_0px_rgba(16,_40,_81,_0.11)] px-2.5 md:px-5 py-2 ">
      <div className="flex justify-between items-center">
        <p className="lg:mb-4 text-base lg:text-xl font-semibold 2xl:text-2xl">
          Upcomming Appointments
        </p>
        <ToggleButton
          data={doctorinfo?.role}
          doctorId={doctorId}
          Checked={Checked}
        />
        <AddNewAppoitment onAppointmentAdded={init} />
      </div>
      {upCommingAppoitments && upCommingAppoitments.length > 0 ? (
        <>
          {/* lgDevice */}
          <div className="mt-2 hidden md:block">
            <aside className="w-full bg-white">
              <div className="grid items-center justify-around md:grid-cols-6 bg-red-50 ">
                <p className="py-2 text-sm font-semibold text-center">
                  Patient Name
                </p>
                <p className="py-2 ml-3 text-sm font-semibold text-center 2xl:ml-7">
                  Mobile No
                </p>
                <p className="py-2 text-sm font-semibold text-center ">
                  Date & Time
                </p>

                <p className="py-2 text-sm font-semibold text-center ">
                  Write Prescription
                </p>
                <p className="py-2 text-sm font-semibold text-center">Status</p>
                <p className="py-2 text-sm font-semibold text-center">Call</p>
              </div>
            </aside>
            {upCommingAppoitments?.map((item, index) => {
              if (item.paymentStatus === "pending") {
                return null;
              }
              return (
                <aside key={index} className={``}>
                  <ScheduleList data={item} handleMakeCall={handleMakeCall} />
                </aside>
              );
            })}
          </div>
          {/* smDevice */}
          <div className="md:hidden  block">
            {upCommingAppoitments?.map((item, index) => {
              if (item.paymentStatus === "pending") {
                return null;
              }
              return (
                <div
                  className=" grid grid-cols-3 border-b border-black py-2 "
                  key={index}
                >
                  <aside className="col-span-1 grid grid-rows-6 bg-[#FFF4F4]">
                    <p className="py-3 text-xs flex items-center justify-center font-medium  text-[#16020B] border-t">
                      Patient Name
                    </p>
                    <p className="py-3 text-xs font-medium flex items-center justify-center  2xl:ml-7 text-[#16020B] border-y">
                      Mobile No
                    </p>
                    <p className="py-2 text-xs font-medium flex items-center justify-center text-[#16020B] ">
                      Date & Time
                    </p>
                    <p className="py-2 text-xs font-medium flex items-center justify-center text-[#16020B] border-y">
                      Prescription
                    </p>
                    <p className="py-2 text-xs font-medium flex items-center justify-center text-[#16020B] border-b">
                      STATUS
                    </p>
                    <p className="py-2 text-xs font-medium flex items-center justify-center text-[#16020B]">
                      Call
                    </p>
                  </aside>
                  <aside
                    className={`col-span-2 ${
                      index % 2 == 0 ? "" : "bg-gray-50"
                    }`}
                  >
                    <ScheduleList data={item} handleMakeCall={handleMakeCall} />
                  </aside>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p>Don't Have Any Appoitment</p>
      )}
    </section>
  );
};

export default MyAppoitments;
