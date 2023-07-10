"use client";

import { usePdf } from "@mikecousins/react-pdf";

import React, { useState, useRef } from "react";

const pdfViewer = () => {
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  const { pdfDocument, pdfPage } = usePdf({
    file: "https://arxiv.org/pdf/quant-ph/0410100.pdf",
    page,
    canvasRef,
  });
  return (
    <div>
      {!pdfDocument && <span>Loading...</span>}
      <canvas ref={canvasRef} />
      {Boolean(pdfDocument && pdfDocument.numPages) && (
        <nav>
          <ul
            className="pager"
            style={{
              display: "flex",
              marginBottom: "0px",
              justifyContent: "center",
            }}
          >
            <ul
              className="previous"
              style={{
                paddingLeft: "0px",
              }}
            >
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
              </button>
            </ul>
            <ul className="next">
              <button
                disabled={page === pdfDocument.numPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </ul>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default pdfViewer;
