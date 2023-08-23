"use client";
import { useState, useEffect } from "react";

const PptViewer = ({ id }) => {
  const [urlFile, setUrlFile] = useState(null);

  let sourceId = id;

  //get file url from local storage
  useEffect(() => {
    let fileUrl = "";

    if (typeof window !== "undefined") {
      // Check if the unique ID exists in local storage
      if (localStorage.getItem(`${sourceId}`)) {
        // If it exists, retrieve the unique ID
        fileUrl = localStorage.getItem(`${sourceId}`);
        setUrlFile(fileUrl);
      }
    }
  }, [sourceId]);

  return (
    <>
      <div
        style={{
          marginTop: "50px",
        }}
      >
        {urlFile && (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${urlFile}`}
            width="100%"
            height="600"
          />
        )}
      </div>
    </>
  );
};

export default PptViewer;
