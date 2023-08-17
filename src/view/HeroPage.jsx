"use client";

import ChatHistoryCard from "@/components/ChatHistoryCard";
import DetailsCard from "@/components/DetailsCard";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Uploader from "@/components/Uploader";

import IconDiscord from "@/icons/IconDiscord";
import IconFacebook from "@/icons/IconFacebook";
import IconTwitterSquare from "@/icons/IconTwitterSquare";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { PiStudentBold } from "react-icons/pi";
import { FaMicroscope } from "react-icons/fa";
import { LiaPasteSolid } from "react-icons/lia";
import { TfiWorld } from "react-icons/tfi";
import { BsChatLeftQuote } from "react-icons/bs";
import { AiOutlineLock } from "react-icons/ai";

const HeroPage = () => {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState(null);
  const [recentChats, setRecentChats] = useState([]);
  useEffect(() => {
    let userId = "";

    if (typeof window !== "undefined") {
      // Check if the unique ID exists in local storage
      if (localStorage.getItem("userId")) {
        // If it exists, retrieve the unique ID
        userId = localStorage.getItem("userId");
        setUserId(userId);
        console.log("userId :", userId);
      } else {
        // If it doesn't exist, generate a new unique ID
        userId = uuidv4();
        // Store the unique ID in local storage
        localStorage.setItem("userId", userId);
        setUserId(userId);
        console.log("userId :", userId);
      }
    }
  }, []);

  //fetch recent chats from backend

  const fetchRecentChats = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASS_URL}/api/v1/chatdoc/recent_chat?userid=${userId}`
      );
      const data = await response.json();
      console.log(data.result?.recent_chats);
      setRecentChats(data.result?.recent_chats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchRecentChats();
    }
  }, [userId]);

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
              Chat with any PDF
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
            marginTop: "30px",
          }}
        >
          <div className="row">
            <div>
              <h2
                style={{
                  fontSize: "24px",
                }}
              >
                ChatPDF in a Nutshell
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  color: "rgba(0, 0, 0, 0.45)",
                  lineHeight: "1.57",
                }}
              >
                Your PDF AI - like ChatGPT but for PDFs. Summarize and answer
                questions for free.
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
                  "Works worldwide! ChatPDF accepts PDFs in any language and can chat in any language."
                }
              />
            </div>
            <div className="col-md-4 col-sm-12 d-flex justify-content-center  ">
              <DetailsCard
                icon={<BsChatLeftQuote size={"25px"} />}
                title={"Cited Sources"}
                description1={
                  "Answers contain references to their source in the original PDF document. No more flipping pages."
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
          marginTop: "40px",
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
