"use client";

import { Button, Dropdown } from "antd";
import Link from "next/link";
import { MenuOutlined, CloseSquareOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { Modal, Input } from "antd";
import APIClient from "@/lib/axiosInterceptor";
import jwt from "jsonwebtoken";

const NavBar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userProfileInfo, setUserProfileInfo] = useState(null);

  const [fetchProfileInfoLoading, setFetchProfileInfoLoading] = useState(false);

  const menuRef = useRef(null);

  //reset password func
  const handleReset = () => {};

  //modal func

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = [
    {
      key: "1",
      label: (
        <p
          className="text-decoration-none d-flex justify-content-center"
          onClick={showModal}
          style={{
            margin: "0px",
          }}
        >
          Profile
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <Link href="/transactions" className="text-decoration-none">
          Transactions
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Button
          className="text-decoration-none text-black d-flex justify-content-center"
          onClick={() => signOut()}
          style={{
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
          }}
        >
          Sign Out
        </Button>
      ),
    },
  ];

  // get user id
  const getUserId = () => {
    let userId = "";
    if (session) {
      const decoded = jwt.decode(session.accessToken);
      console.log("decoded :", decoded.userid);
      userId = decoded.userid;
      setUserId(userId);
    }
  };

  useEffect(() => {
    getUserId();
  }, [session]);

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

  //sign off
  useEffect(() => {
    if (session?.accessToken === null) {
      signOut();
    }
  }, [session]);

  //fetch profile

  const fetchProfile = async () => {
    setFetchProfileInfoLoading(true);
    try {
      const response = await APIClient.get(
        `api/v1/user/profile?userid=${userId}`
      );
      const data = response.data;
      console.log(data);
      setUserProfileInfo(data.result);
      setFetchProfileInfoLoading(false);
    } catch (error) {
      console.log(error);
      setFetchProfileInfoLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId, session]);

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
          <Link href="/faq" className="text-decoration-none text-black me-5">
            FAQ
          </Link>
          <Link href="/" className="text-decoration-none text-black me-5">
            About
          </Link>
        </div>
        <div className="d-flex align-items-center position-relative">
          {session?.accessToken ? (
            <>
              {/* profile section */}
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottom"
                className="dropdown-profile"
              >
                <div>
                  {session?.provider === "github" && (
                    <div>
                      <img
                        src={session?.user?.image}
                        alt=""
                        style={{
                          width: "50px",
                          height: "50px",
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
                          width: "50px",
                          height: "50px",
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
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                  )}
                  {session?.provider === "credentials" && (
                    <div>
                      <img
                        src={"/user_image.png"}
                        alt="user image"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                  )}
                </div>
              </Dropdown>

              {!fetchProfileInfoLoading && userProfileInfo && (
                <div className="profile-batch">
                  <span
                    className="position-absolute "
                    style={{
                      background: "#fff",
                      padding: "2px 5px",
                      borderRadius: "8px",
                      left: "40px",
                      fontSize: "12px",
                    }}
                  >
                    {userProfileInfo?.subscription_tier}
                  </span>
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

      {/* profile model */}
      <Modal
        title="Profile"
        footer={null}
        onCancel={handleCancel}
        open={isModalOpen}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "5px",
          }}
        >
          <div>Name</div>
          <div>{userProfileInfo?.name}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "5px",
          }}
        >
          <div>Email</div>
          <div>{userProfileInfo?.email}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px",
          }}
        >
          <Button onClick={handleReset}>Reset Password</Button>
        </div>
      </Modal>
    </>
  );
};

export default NavBar;
