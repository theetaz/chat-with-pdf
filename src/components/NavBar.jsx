"use client";

import { Button } from "antd";
import Link from "next/link";
import { MenuOutlined, CloseSquareOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Effect to add event listener when the menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const handleOutsideClick = (event) => {
        // Close the menu if the click is outside the menu area
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsMenuOpen(false);
        }
      };

      document.addEventListener("click", handleOutsideClick);

      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* Dekstop Nav */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "20px 0",
        }}
        className="d-none d-md-flex"
      >
        <div>
          <span
            style={{
              fontSize: "22px",
              fontWeight: "300",
              lineHeight: "20px",
              fontStyle: "italic",
            }}
          >
            smart
          </span>
          <span
            style={{
              fontSize: "22px",
              fontWeight: "700",
              lineHeight: "20px",
              fontStyle: "italic",
            }}
          >
            .pdf
          </span>
        </div>
        <div
          className="d-flex align-items-center"
          style={{
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
          }}
        >
          <Link href="/" className="text-decoration-none text-black me-5">
            Pricing
          </Link>
          <Link href="/" className="text-decoration-none text-black me-5">
            FAQ
          </Link>
          <Link
            href="/"
            className="text-decoration-none text-black me-5"
          >
            Affliate
          </Link>
          <Link href="/" className="text-decoration-none text-black me-5">
            About
          </Link>
        </div>
        <div className="d-flex align-items-center">
          <Link
            className="text-decoration-none text-black me-3"
            href="/login"
            style={{
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "20px",
            }}
          >
            Login
          </Link>
          <Button
            style={{
              width: "100%",
              background: "transparent",
              border: "1px solid #bccadf",
              color: "#000000",
            }}
            type="primary"
          >
            Get started
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="d-flex d-md-none flex-column ">
        <div
          className="d-flex justify-content-between align-items-center py-2 px-1 w-100"
          ref={menuRef}
        >
          <div>
            <span
              style={{
                fontSize: "22px",
                fontWeight: "300",
                lineHeight: "20px",
                fontStyle: "italic",
              }}
            >
              smart
            </span>
            <span
              style={{
                fontSize: "22px",
                fontWeight: "700",
                lineHeight: "20px",
                fontStyle: "italic",
              }}
            >
              .pdf
            </span>
          </div>
          <div
            className="d-flex align-items-center "
            style={{
              cursor: "pointer",
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <CloseSquareOutlined /> : <MenuOutlined />}
          </div>
        </div>

        {/* menu-mobile */}
        {isMenuOpen && (
          <div className="d-flex flex-column mobile-nav-menu">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <Link
                href="/"
                className="text-decoration-none text-white mt-2"
                style={{}}
              >
                Pricing
              </Link>
              <Link
                href="/"
                className="text-decoration-none text-white mt-2"
              >
                FAQ
              </Link>
              <Link
                href="/"
                className="text-decoration-none text-white mt-2"
              >
                Affliate
              </Link>
              <Link
                href="/"
                className="text-decoration-none text-white mt-2"
              >
                About
              </Link>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <Button
                className="text-decoration-none text-white "
                href="/login"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "20px",
                  background: "transparent",
                  border: "1px solid #bccadf",
                  color: "#000000",
                }}
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
