"use client";

import ChatComp from "@/components/ChatComp";
import OtherPdfView from "@/components/OtherPdfView";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  let id = params.id;
  const [pdfFileName, setPdfFileName] = useState(null);

  //get pdf name from local storage
  useEffect(() => {
    let pdfName = "";

    if (typeof window !== "undefined") {
      // Check if the unique ID exists in local storage
      if (localStorage.getItem(`${id}name`)) {
        // If it exists, retrieve the unique ID
        pdfName = localStorage.getItem(`${id}name`);
        console.log("pdfName from LS :", pdfName);
        setPdfFileName(pdfName);
      }
    }
  }, [id]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        overflowX: "hidden",
      }}
    >
      {/* pdf viewer */}

      <div
        style={{
          flex: "42.237",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            backgroundColor: "#ffffff",
          }}
        >
          <div
            style={{
              fontSize: "13px",
              alignItems: "center",
              display: "flex",
              padding: "0px 8px 0px 6px",
              height: "42px",
              borderBottom: "2px solid rgb(238, 238 ,238 )",
            }}
          >
            <h1
              style={{
                fontSize: "16px",
                marginRight: "auto",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                paddingLeft: "6px",
                marginBottom: "0px",
              }}
            >
              {pdfFileName}
            </h1>
          </div>
          <div>
            <OtherPdfView id={id} />
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "rgb(238, 238 ,238 )",
          width: "4px",
          height: "100vh",
        }}
      />
      {/* chats */}
      <div
        style={{
          flex: "33.5068 1 0px",
          overflow: "hidden",
          backgroundColor: "#e8e8e8",
        }}
      >
        <ChatComp id={id} />
      </div>
    </div>
  );
}
