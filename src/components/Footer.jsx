import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <Link
        href="/about"
        style={{
          marginRight: "10px",
          textDecoration: "none",
          color: "#8496aa",
        }}
      >
        About
      </Link>
      <Link
        href="/about"
        style={{
          marginRight: "10px",
          textDecoration: "none",
          color: "#8496aa",
        }}
      >
        Pricing
      </Link>
      <Link
        href="/about"
        style={{
          marginRight: "10px",
          textDecoration: "none",
          color: "#8496aa",
        }}
      >
        FAQ
      </Link>
      <Link
        href="/about"
        style={{
          marginRight: "10px",
          textDecoration: "none",
          color: "#8496aa",
        }}
      >
        Affiliate
      </Link>
      <Link
        href="/about"
        style={{
          marginRight: "10px",
          textDecoration: "none",
          color: "#8496aa",
        }}
      >
        Twitter
      </Link>
    </>
  );
};

export default Footer;
