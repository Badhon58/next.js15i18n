"use client";
import "./style.css";
const image1 =
  "bg-[url('https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-06012025T171435-mask-group.svg')] rounded-lg";
const image2 =
  "md:bg-[url('https://clinicall-files.obs.as-south-208.rcloud.reddotdigitalit.com/upload-file-23122024T172655-1440x620-web-banner-1.svg')] rounded-lg";
import { MdCallEnd, MdEmojiEmotions, MdFullscreen } from "react-icons/md";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaUser,
  FaUserDoctor,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa6";
import { IoMdSend, IoMdSettings } from "react-icons/io";
import { useSocket } from "@/context/SocketContext";
import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
  IAgoraRTCClient,
} from "agora-rtc-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { formatDurationTime } from "@/lib/healper";
import { useRouter } from "next/navigation";
import { Modal } from "rsuite";
import Image from "next/image";

export const Window = ({
  channel,
  client,
  isVideo,
}: {
  channel: string;
  client: IAgoraRTCClient;
  isVideo: string;
}) => {
  const [calling, setCalling] = useState(false);
  const [received, setReceived] = useState(false);

  const isConnected = useIsConnected(); // Store the user's connection status
  const [appId, setAppId] = useState("97418b91448646b6b7a710005d6f6e68");
  const [timer, setTimer] = useState(0);
  const {
    ongoingCall,
    cancellCall,
    isRinging,
    // isAnswered,
    // isRejected,
    // isEnded,
    micOn,
    setMic,
    cameraOn,
    setCamera,
    socketRef,
    endCall,
    availableDrInfo,
  } = useSocket();

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  useJoin({ appid: appId, channel: channel, token: null }, calling);

  usePublish([localMicrophoneTrack, localCameraTrack]);
  const remoteUsers = useRemoteUsers();
  const router = useRouter();

  useEffect(() => {
    // setIsRinging(false)
    let timeout: any;
    if (remoteUsers.length > 0) {
      timeout = setTimeout(() => {
        console.log("Timer Value:", timer);
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [timer, remoteUsers]);

  const onToggleCamera = () => {
    setCamera((a) => !a);
    socketRef.current.emit("kernel-status-change", {
      targetedId: ongoingCall?.participants.caller,
      isCameraOff: !cameraOn,
      isMute: !micOn,
      isFrontCameraSelected: true,
      id: ongoingCall?.id,
    });
  };

  const onToggleMic = () => {
    setMic((a) => !a);
    socketRef.current.emit("kernel-status-change", {
      targetedId: ongoingCall?.participants.caller,
      isCameraOff: !cameraOn,
      isMute: !micOn,
      isFrontCameraSelected: true,
      id: ongoingCall?.id,
    });
  };

  //   const goFullScreen = () => {
  //       if (remoteVideoRef.current) {
  //         if (remoteVideoRef.current.requestFullscreen) {
  //           remoteVideoRef.current.requestFullscreen();
  //         } else if ((remoteVideoRef.current as any).webkitRequestFullscreen) {
  //           (remoteVideoRef.current as any).webkitRequestFullscreen(); // Safari
  //         } else if ((remoteVideoRef.current as any).mozRequestFullScreen) {
  //           (remoteVideoRef.current as any).mozRequestFullScreen(); // Firefox
  //         } else if ((remoteVideoRef.current as any).msRequestFullscreen) {
  //           (remoteVideoRef.current as any).msRequestFullscreen(); // IE/Edge
  //         }
  //       }
  //     };

  const onEndCall = async () => {
    setCalling(false);
    if (remoteUsers.length > 0) {
      endCall();
    } else {
      cancellCall();
    }
    await client.leave();
    router.replace("/microsite");
  };

  useEffect(() => {
    console.log("Is Video: ", isVideo);
    setMic(true);
    if (isVideo == "true") {
      setCamera(true);
    }
    // console.log("Audio Track", localMicrophoneTrack);
    setCalling(true);
  }, [channel, setMic, setCamera]);

  useEffect(() => {
    if (!ongoingCall) {
      client.leave();
      router.replace("/microsite");
    }
  }, [ongoingCall]);
  console.log("AAAAAAAAAAAAAAAAA", availableDrInfo);
  return (
    // <>
    //   <div>
    //     {/* {remoteUsers.length == 0 ? (
    //       <p>{isRinging ? "Ringing..." : "Calling..."}</p>
    //     ) : (
    //       <p>Connected! {remoteUsers.length}</p>
    //     )} */}

    //   </div>
    // </>\
    <div className="relative">
      {
        remoteUsers.length == 0 ? (
          isRinging ? (
            <>
              <div
                className="absolute min-h-[90vh] w-full inset-0 bg-cover bg-center blur-sm"
                style={{
                  backgroundImage:
                    `url('${availableDrInfo?.image}')` ||
                    "url('/MediServices/Doctor.svg')",
                }}
              ></div>
              <div
                // style={{ backgroundImage: "/MediServices/Doctor.svg" }}
                className="min-h-[90vh] z-10 p-4 flex items-center  w-full flex-col justify-between absolute h-full"
              >
                <span></span>
                <div className="flex flex-col justify-center items-center">
                  <Image
                    src={availableDrInfo?.image || "/MediServices/Doctor.svg"}
                    alt=""
                    width={300}
                    height={300}
                    className="size-24 rounded-full"
                  />
                  <p className="font-semibold text-lg">
                    {availableDrInfo
                      ? `${availableDrInfo?.firstName} ${availableDrInfo?.lastName}`
                      : "No Doctor Found"}
                  </p>
                  <p className="text-base ">Ringing...</p>
                </div>
                <div>
                  <div className="absolute bottom-10  left-1/2 -translate-x-1/2  w-full flex justify-center space-x-4 z-10">
                    <button
                      onClick={() => {}}
                      className="px-3 py-2  bg-white rounded-full"
                    >
                      <MdFullscreen className="lg:text-2xl text-lg" />
                    </button>
                    <button
                      onClick={() => onToggleMic()}
                      className="px-3 py-2  bg-white rounded-full"
                    >
                      {micOn ? (
                        <FaMicrophone className="lg:text-2xl text-lg" />
                      ) : (
                        <FaMicrophoneSlash className="lg:text-2xl text-lg" />
                      )}
                    </button>
                    <button
                      onClick={() => onEndCall()}
                      className="px-3 py-2  bg-[#E51515] rounded-xl"
                    >
                      <MdCallEnd
                        className="lg:text-2xl text-xl text-white"
                        size={32}
                      />
                    </button>
                    <button
                      onClick={() => onToggleCamera()}
                      className="px-3 py-2  bg-white rounded-full"
                    >
                      {cameraOn ? (
                        <FaVideo className="lg:text-2xl text-lg " />
                      ) : (
                        <FaVideoSlash className="lg:text-2xl text-lg " />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        console.log("Ongoing ", ongoingCall);
                      }}
                      className="px-3 py-2  bg-white rounded-full"
                    >
                      <IoMdSettings className="lg:text-2xl text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            "Calling..."
          )
        ) : null
        //  (
        //   <p>Connected! {remoteUsers.length}</p>
        // )
      }

      {isConnected ? (
        <div className=" rounded-md  pb-3">
          {/* <div className="absolute top-0 w-full min-h-[90vh] max-h-[95vh] bg-cover bg-center "></div> */}

          {/* <div className={` ${image2} ${image1} `}> */}
          <div className={` `}>
            {isVideo == "true" &&
              remoteUsers.length > 0 &&
              remoteUsers.map((user) => (
                <div key={user.uid}>
                  <RemoteUser
                    className=" min-h-[50vh] mx-auto"
                    user={user}
                    style={{
                      height: "90vh",
                    }}
                  >
                    <samp>{formatDurationTime(timer)}</samp>
                  </RemoteUser>
                </div>
              ))}
          </div>

          <div className="z-20 absolute top-3  right-2 w-[130px] h-[200px] rounded-md">
            <LocalUser
              className="w-full h-auto   rounded-lg overflow-hidden"
              audioTrack={localMicrophoneTrack}
              cameraOn={cameraOn}
              micOn={micOn}
              playAudio={false} // Plays the local user's audio track. You use this to test your microphone before joining a channel.
              videoTrack={localCameraTrack}
              //   style={{ width: "30%", height: 300 }}
            >
              {/* <samp>You</samp> */}
            </LocalUser>
          </div>
          <div className="absolute bottom-10  left-1/2 -translate-x-1/2  w-full flex justify-center space-x-4 z-10">
            <button
              onClick={() => {}}
              className="px-3 py-2  bg-white rounded-full"
            >
              <MdFullscreen className="lg:text-2xl text-lg" />
            </button>
            <button
              onClick={() => onToggleMic()}
              className="px-3 py-2  bg-white rounded-full"
            >
              {micOn ? (
                <FaMicrophone className="lg:text-2xl text-lg" />
              ) : (
                <FaMicrophoneSlash className="lg:text-2xl text-lg" />
              )}
            </button>
            <button
              onClick={() => onEndCall()}
              className="px-3 py-2  bg-[#E51515] rounded-xl"
            >
              <MdCallEnd className="lg:text-2xl text-xl text-white" size={32} />
            </button>
            <button
              onClick={() => onToggleCamera()}
              className="px-3 py-2  bg-white rounded-full"
            >
              {cameraOn ? (
                <FaVideo className="lg:text-2xl text-lg " />
              ) : (
                <FaVideoSlash className="lg:text-2xl text-lg " />
              )}
            </button>
            <button
              onClick={() => {
                console.log("Ongoing ", ongoingCall);
              }}
              className="px-3 py-2  bg-white rounded-full"
            >
              <IoMdSettings className="lg:text-2xl text-lg" />
            </button>
          </div>
        </div>
      ) : (
        // </section>
        <div></div>
      )}
    </div>
  );
};
