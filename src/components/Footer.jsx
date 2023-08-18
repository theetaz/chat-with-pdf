import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="mb-2">
          <Link
            href="/"
            style={{
              marginRight: "35px",
              textDecoration: "none",
              color: "#8496aa",
              fontSize: "14px",
            }}
          >
            About
          </Link>
          <Link
            href="/"
            style={{
              marginRight: "35px",
              textDecoration: "none",
              color: "#8496aa",
              fontSize: "14px",
            }}
          >
            Pricing
          </Link>
          <Link
            href="/"
            style={{
              marginRight: "35px",
              textDecoration: "none",
              color: "#8496aa",
              fontSize: "14px",
            }}
          >
            FAQ
          </Link>
          <Link
            href="/"
            style={{
              marginRight: "25px",
              textDecoration: "none",
              color: "#8496aa",
              fontSize: "14px",
            }}
          >
            Twitter
          </Link>
        </div>
        <div
          style={{
            color: "#8496aa",
            fontSize: "12px",
          }}
        >
          Copyright chat-with-pdf 2023, All Rights Reserved. Powered by{" "}
          <Link
            href="/"
            style={{
              textDecoration: "none",
            }}
          >
            Perfectus
          </Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
