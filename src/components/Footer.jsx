import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div>
          <Link
            href="/about"
            style={{
              marginRight: "35px",
              textDecoration: "none",
              color: "#8496aa",
            }}
          >
            About
          </Link>
          <Link
            href="/about"
            style={{
              marginRight: "35px",
              textDecoration: "none",
              color: "#8496aa",
            }}
          >
            Pricing
          </Link>
          <Link
            href="/about"
            style={{
              marginRight: "35px",
              textDecoration: "none",
              color: "#8496aa",
            }}
          >
            FAQ
          </Link>
          <Link
            href="/about"
            style={{
              marginRight: "35px",
              textDecoration: "none",
              color: "#8496aa",
            }}
          >
            Affiliate
          </Link>
          <Link
            href="/about"
            style={{
              marginRight: "25px",
              textDecoration: "none",
              color: "#8496aa",
            }}
          >
            Twitter
          </Link>
        </div>
        <div style={{
          color: "#8496aa",
          fontSize: "14px",
        }}> 
          Copyright chat-with-pdf 2023, All Rights Reserved. Powered{" "}by{" "}
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
