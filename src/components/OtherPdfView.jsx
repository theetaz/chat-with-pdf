"use client";

export default function OtherPdfView() {
  const url =
    "https://scholar.harvard.edu/files/david-morin/files/waves_quantum.pdf";

  const viewerUrl = `${url}#page=1&zoom=80&toolbar=0`;
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
