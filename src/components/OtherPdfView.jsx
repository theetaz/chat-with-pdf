"use client";

import { useEffect, useState } from "react";
import { Spin } from "antd";

export default function OtherPdfView({ id }) {
  let sourceId = id;

  const [urlPdf, setUrlPdf] = useState(null);
  const [loading, setLoading] = useState(true);

  

  //get pdf url from local storage
  useEffect(() => {
    let pdfUrl = "";

    if (typeof window !== "undefined") {
      // Check if the unique ID exists in local storage
      if (localStorage.getItem(`${sourceId}`)) {
        // If it exists, retrieve the unique ID
        pdfUrl = localStorage.getItem(`${sourceId}`);
        setUrlPdf(pdfUrl);
        
        setLoading(false);
      }
    }
  }, [sourceId]);

  const url = urlPdf;

  const viewerUrl = `${url}#page=1&zoom=80&toolbar=0`;
  return (
    <>
      {loading ? (
        <div>
          <Spin size="large" />
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "94vh",
            backgroundColor: "#ffffff !important",
          }}
        >
          <iframe src={viewerUrl} width="100%" height="100%" frameBorder="0" />
        </div>
      )}
    </>
  );
}
