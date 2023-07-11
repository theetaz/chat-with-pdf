"use client";

export default function OtherPdfView() {
    
  const viewerUrl =
    "https://www.africau.edu/images/default/sample.pdf#page=1&zoom=80&toolbar=0";
  return (
    <div
      style={{
        width: "100%",
        height: "94vh",
        backgroundColor: "#ffffff !important",
      }}
    >
      <iframe src={viewerUrl} width="100%" height="100%" frameBorder="0" />
    </div>
  );
}
