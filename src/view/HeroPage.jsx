"use client";

import ChatHistoryCard from "@/components/ChatHistoryCard";
import DetailsCard from "@/components/DetailsCard";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Uploader from "@/components/Uploader";

import IconDiscord from "@/icons/IconDiscord";
import IconFacebook from "@/icons/IconFacebook";
import IconTwitterSquare from "@/icons/IconTwitterSquare";
import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { PiStudentBold } from "react-icons/pi";
import { FaMicroscope } from "react-icons/fa";
import { LiaPasteSolid } from "react-icons/lia";
import { TfiWorld } from "react-icons/tfi";
import { BsChatLeftQuote } from "react-icons/bs";
import { AiOutlineLock } from "react-icons/ai";
import { useSession } from "next-auth/react";
import APIClient from "@/lib/axiosInterceptor";
import jwt from "jsonwebtoken";
import { setReloadChatHistory } from "@/feature/dataslice";
import FormData from "form-data";
import axios from "axios";

const HeroPage = () => {
  const dispatch = useDispatch();

  const { data: session } = useSession();

  const [userId, setUserId] = useState(null);
  const [recentChats, setRecentChats] = useState([]);
  const [localUserId, setLocalUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASS_URL;

  const getUserId = () => {
    let userId = "";
    if (session) {
      const decoded = jwt.decode(session?.accessToken);
      console.log("decoded :", decoded?.userid);
      userId = decoded?.userid;
      setUserId(userId);
    }
  };

  useEffect(() => {
    if (session) {
      getUserId();
    }
  }, [session]);

  const triggerChatHistoryReload = useSelector(
    (state) => state.data.setReloadChatHistory
  );

  useEffect(() => {
    let localUserId = "";

    if (typeof window !== "undefined") {
      // Check if the unique ID exists in local storage
      if (localStorage.getItem("localUserId")) {
        // If it exists, retrieve the unique ID
        localUserId = localStorage.getItem("localUserId");
        setLocalUserId(localUserId);
      } else {
        // If it doesn't exist, generate a new unique ID
        localUserId = uuidv4();
        // Store the unique ID in local storage
        localStorage.setItem("localUserId", localUserId);
        setLocalUserId(localUserId);
      }
    }
  });

  //unregister user logics

  const unregisterUser = async () => {
    let data = new FormData();
    data.append("userid", localUserId);

    try {
      const respond = axios.post(`${baseUrl}/api/v1/user/unregister`, data);
      const result = await respond;
      console.log("unreg result :", result?.data?.result);
      setUserToken(result?.data?.result?.access_token);
    } catch (error) {
      console.log("unreg error :", error);
    }
  };

  useEffect(() => {
    if (localUserId && !session) {
      unregisterUser();
    }
  }, [localUserId, session]);

  //store user id with access token in local storage

  useEffect(() => {
    if (userToken) {
      localStorage.setItem(`${localUserId}userToken`, userToken);
    }
  });

  //fetch recent chats from backend

  // const fetchRecentChats = async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_BASS_URL}/api/v1/chatdoc/recent_chat?userid=${userId}`
  //     );
  //     const data = await response.json();

  //     setRecentChats(data.result?.recent_chats);
  //   } catch (error) {
  //     console.log(error);
  //     message.error(error.message);
  //   }
  // };

  const fetchRecentChats = async () => {
    if (session) {
      try {
        const response = await APIClient.get(
          `/api/v1/chatdoc/recent_chat?userid=${userId}`
        );
        const data = response?.data;
        console.log("recent chats", data.result?.recent_chats);
        setRecentChats(data.result?.recent_chats);
        dispatch(setReloadChatHistory(false));
      } catch (error) {
        console.log(error);
        message.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (userId || triggerChatHistoryReload) {
      fetchRecentChats();
    }
  }, [userId, triggerChatHistoryReload]);

  return (
    <>
      <div
        style={{
          width: "100%",
        }}
      >
        <NavBar />
      </div>
      <div
        className="container text-center "
        style={{
          paddingTop: "50px",
          maxWidth: "1024px",
        }}
      >
        <div className="row px-lg-5 px-0">
          <div className="col">
            <h1
              style={{
                textAlign: "center",
              }}
              className="text-capitalize fw-semibold fs-1 "
            >
              Chat with Docs
            </h1>
            <div className="row buttonCol">
              <div
                className="col-md-4 col-lg-4 col-sm-12 mt-3 mt-lg-0 "
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "1px solid #bccadf",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="headerButton"
                  icon={<IconDiscord />}
                >
                  Join Discord
                </Button>
              </div>
              <div
                className="col-md-4 col-lg-4 col-sm-12 mt-3 mt-lg-0 "
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "1px solid #bccadf",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  icon={<IconTwitterSquare />}
                  className="headerButton"
                >
                  Post on Twitter
                </Button>
              </div>
              <div
                className="col-md-4 col-lg-4 col-sm-12 mt-3 mt-lg-0 "
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "1px solid #bccadf",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  icon={<IconFacebook />}
                  className="headerButton"
                >
                  Share on Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-5 uploader-container ">
          <Uploader />
        </div>

        {/* chat history container */}
        {recentChats?.length > 0 && (
          <div className="container mt-4">
            <ChatHistoryCard recentChats={recentChats} />
          </div>
        )}

        {/* details cards */}
        <div
          className=""
          style={{
            marginTop: "50px",
          }}
        >
          <div className="row">
            <div>
              <h2
                style={{
                  fontSize: "22px",
                }}
              >
                SmartAIDoc in a Nutshell
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "rgba(0, 0, 0, 0.45)",
                  lineHeight: "1.57",
                }}
              >
                Your document AI - like ChatGPT but for pdf, csv, excel and
                powerpoint docs. Summarize and answer questions for free.
              </p>
            </div>
            <div className="col-md-4 col-sm-12 d-flex justify-content-center  ">
              <DetailsCard
                icon={<PiStudentBold size={"25px"} />}
                title={"For Students"}
                description1={
                  "Prepare for exams, get help with homework and answer multiple choice questions."
                }
              />
            </div>
            <div className="col-md-4 col-sm-12 d-flex justify-content-center  ">
              <DetailsCard
                icon={<FaMicroscope size={"25px"} />}
                title={"For Researchers"}
                description1={
                  "Scientific papers, academic articles and books. Get the information you need for your research."
                }
              />
            </div>
            <div className="col-md-4 col-sm-12 d-flex justify-content-center  ">
              <DetailsCard
                icon={<LiaPasteSolid size={"25px"} />}
                title={"For Professionals"}
                description1={
                  "Legal contracts, financial reports, manuals and training material. Ask any question to any PDF and get insights fast."
                }
              />
            </div>
            <div className="col-md-4 col-sm-12 d-flex justify-content-center  ">
              <DetailsCard
                icon={<TfiWorld size={"25px"} />}
                title={"Any Language"}
                description1={
                  "Works worldwide! SmartAIDocs accepts documents in any language and can chat in any language."
                }
              />
            </div>
            <div className="col-md-4 col-sm-12 d-flex justify-content-center  ">
              <DetailsCard
                icon={<BsChatLeftQuote size={"25px"} />}
                title={"Cited Sources"}
                description1={
                  "Answers contain references to their source in the original document. No more flipping pages."
                }
              />
            </div>
            <div className="col-md-4 col-sm-12 d-flex justify-content-center  ">
              <DetailsCard
                icon={<AiOutlineLock size={"25px"} />}
                title={"Simple and Secure"}
                description1={
                  "Fast, easy, free & secure! Files are stored in a secure cloud storage and will never be shared."
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* footer links */}
      <div
        style={{
          marginTop: "50px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Footer />
      </div>
    </>
  );
};

export default HeroPage;
