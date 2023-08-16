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
          maxWidth: "924px",
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
          className="container "
          style={{
            marginTop: "30px",
          }}
        >
          <div className="row ">
            <div className="col-md-4 col-sm-12 d-flex justify-content-center  ">
              <DetailsCard
                cardTitle={"For Students 🎓"}
                description1={
                  "Enhance your learning experience with ChatPDF. Comprehend textbooks, handouts, and presentations effortlessly. Don't spend hours flipping through research papers and academic articles."
                }
                description2={
                  "Support your academic growth and succeed in your studies effectively and responsibly."
                }
              />
            </div>
            <div className="col-md-4 col-sm-12 d-flex justify-content-center ">
              <DetailsCard
                cardTitle={"For Work 👩‍💻"}
                description1={
                  "Efficiently analyze your documents. From financial and sales reports to project and business proposals, training manuals, and legal contracts, ChatPDF can quickly provide you with the information you need."
                }
                description2={
                  "Your data is kept confidential in a secure cloud storage and can be deleted at any time."
                }
              />
            </div>
            <div className="col-md-4 col-sm-12 d-flex justify-content-center detailsCardDiv ">
              <DetailsCard
                cardTitle={"For Curious Minds 🤔"}
                description1={
                  "Unlock a wealth of knowledge with ChatPDF. Discover new insights and answers from historical documents, poetry, and literature, effortlessly."
                }
                description2={
                  "ChatPDF can understand any language and reply in your preferred one. Satisfy your curiosity and expand your horizons with the tool that can answer any question from any PDF."
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* footer links */}
      <div
        style={{
          marginTop: "16px",
          marginBottom: "16px",
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
