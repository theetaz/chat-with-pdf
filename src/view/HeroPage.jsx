"use client";

import ChatHistoryCard from "@/components/ChatHistoryCard";
import DetailsCard from "@/components/DetailsCard";
import Footer from "@/components/Footer";
import Uploader from "@/components/Uploader";
import IconDiscord from "@/icons/IconDiscord";
import IconFacebook from "@/icons/IconFacebook";
import IconTwitterSquare from "@/icons/IconTwitterSquare";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

const HeroPage = () => {
  return (
    <>
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
              <div className="col-md-4 col-lg-4 col-sm-12 mt-3 mt-lg-0 ">
                <Button
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "1px solid #bccadf",
                  }}
                  icon={<IconDiscord />}
                >
                  Join Discord
                </Button>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12 mt-3 mt-lg-0 ">
                <Button
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "1px solid #bccadf",
                  }}
                  icon={<IconTwitterSquare />}
                >
                  Post on Twitter
                </Button>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12 mt-3 mt-lg-0 ">
                <Button
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "1px solid #bccadf",
                  }}
                  icon={<IconFacebook />}
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
        <div className="container mt-4">
          <ChatHistoryCard />
        </div>

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
