"use client";

import { Button } from "antd";
import Link from "next/link";
import { MenuOutlined, CloseSquareOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";


const NavBar = () => {
 
  const { data: session } = useSession();
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

  //session console log

  // useEffect(() => {
  //   if (session) {
  //     console.log("navbar " ,session);
  //   }
  // }, [session]);

  //sign out if session.accessToken is null
  useEffect(() => {
    if (session?.accessToken === null) {
      
      signOut();
    }
  }, [session]);

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
          <Link href="/" className="text-decoration-none text-black">
            <span
              style={{
                fontSize: "22px",
                fontWeight: "700",
                lineHeight: "20px",
                fontStyle: "italic",
              }}
            >
              SmartAIDoc
            </span>
          </Link>
          {/* <span
            style={{
              fontSize: "22px",
              fontWeight: "700",
              lineHeight: "20px",
              fontStyle: "italic",
            }}
          >
            .pdf
          </span> */}
        </div>
        <div
          className="d-flex align-items-center"
          style={{
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
          }}
        >
          <Link
            href="/pricing"
            className="text-decoration-none text-black me-5"
          >
            Pricing
          </Link>
          <Link href="/" className="text-decoration-none text-black me-5">
            FAQ
          </Link>
          <Link href="/" className="text-decoration-none text-black me-5">
            About
          </Link>
        </div>
        <div className="d-flex align-items-center">
          {session?.accessToken ? (
            <>
              <Button
                className="text-decoration-none text-black me-3"
                onClick={() => signOut()}
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "20px",
                }}
              >
                Sign Out
              </Button>
              {session?.provider === "github" && (
                <div>
                  <img
                    src={session?.user?.image}
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              )}
              {session?.provider === "google" && (
                <div>
                  <img
                    src={session?.user?.image}
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              )}
              {session?.provider === "facebook" && (
                <div>
                  <img
                    src={session?.image}
                    alt=""
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                className="text-decoration-none text-black me-3"
                href="/sign-in"
                style={{
                  fontSize: "14px",
                  fontWeight: "400",
                  lineHeight: "20px",
                }}
              >
                Login
              </Link>
            </>
          )}
          {!session?.accessToken && (
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
          )}
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
                fontWeight: "700",
                lineHeight: "20px",
                fontStyle: "italic",
              }}
            >
              SmarAIDoc
            </span>
            {/* <span
              style={{
                fontSize: "22px",
                fontWeight: "700",
                lineHeight: "20px",
                fontStyle: "italic",
              }}
            >
              .pdf
            </span> */}
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
                href="/pricing"
                className="text-decoration-none text-white mt-2"
              >
                Pricing
              </Link>
              <Link href="/" className="text-decoration-none text-white mt-2">
                FAQ
              </Link>
              <Link href="/" className="text-decoration-none text-white mt-2">
                Affliate
              </Link>
              <Link href="/" className="text-decoration-none text-white mt-2">
                About
              </Link>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <Button
                className="text-decoration-none text-white "
                href="api/auth/signin"
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
