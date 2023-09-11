"use client";
import PricingCard from "@/components/PricingCard";
import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import APIClient from "@/lib/axiosInterceptor";
import jwt from "jsonwebtoken";
import { calculateRemainDates } from "@/utils";
import Loader from "@/components/Loader";

export default function Transactions() {
  const router = useRouter();
  const { data: session } = useSession();

  const [urlObject, setUrlObject] = useState(null);
  const [userId, setUserId] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  const [fetchProfileInfoLoading, setFetchProfileInfoLoading] = useState(false);
  const [userUsage, setUserUsage] = useState(null);
  const [userUsageLoading, setUserUsageLoading] = useState(false);

  //get user id

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

  //get customer id

  const getCustomerId = async () => {
    try {
      const response = await APIClient.get(
        `/api/v1/payment/customer?userid=${userId}`
      );
      const data = response.data;
      console.log("data :", data);
      setCustomerId(data?.result?.stripe_cutomer_id);
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getCustomerId();
    }
  }, [userId, session]);

  //create portal

  const manageSub = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/createportal",
        {
          customer_id: customerId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("data :", data);
      setUrlObject(data);
    } catch (error) {
      console.log("error :", error);
    }
  };

  //if url is ready redirect to stripe portal

  useEffect(() => {
    if (urlObject) {
      const url = urlObject.url;
      console.log("url :", url);
      router.push(url);
    }
  }, [urlObject]);

  //fetch user tier data

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

  //get user usage data

  const getUserUsage = async () => {
    setUserUsageLoading(true);
    try {
      const responsible = await APIClient.get(
        `api/v1/user/usage?userid=${userId}`
      );
      const data = responsible.data;
      console.log("data :", data);
      setUserUsage(data.result);
      setUserUsageLoading(false);
    } catch (error) {
      console.log("error :", error);
      setUserUsageLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserUsage();
    }
  }, [userId]);

  return (
    <>
      <div
        className="container p-4 mt-5"
        style={{
          border: "1px solid #000",
          borderRadius: "10px",
          background: "#fff",
          maxWidth: "1020px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h4>Subscription</h4>
            <p
              style={{
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {userProfileInfo?.subscription_tier}
            </p>
          </div>
          {userProfileInfo?.subscription_tier === "plus" && (
            <div>
              <Button onClick={manageSub}>Manage Subscription</Button>
            </div>
          )}
        </div>
        {userUsageLoading ? (
          <Loader />
        ) : (
          <>
            <Row>
              <Col span={8}>
                <p
                  style={{
                    color: "#828391",
                  }}
                >
                  Subscribed to
                </p>
              </Col>
              <Col span={8}>{userProfileInfo?.subscription_tier}</Col>
            </Row>
            <Row>
              <Col span={8}>
                <p
                  style={{
                    color: "#828391",
                  }}
                >
                  Documents used
                </p>
              </Col>
              <Col
                span={8}
              >{`${userUsage?.used_documents} / ${userUsage?.total_documents} `}</Col>
            </Row>
            <Row>
              <Col span={8}>
                <p
                  style={{
                    color: "#828391",
                  }}
                >
                  Questions used
                </p>
              </Col>
              <Col
                span={8}
              >{`${userUsage?.used_questions} / ${userUsage?.total_question} `}</Col>
            </Row>
            <Row>
              <Col span={8}>
                <p
                  style={{
                    color: "#828391",
                  }}
                >
                  Next reset in
                </p>
              </Col>
              <Col span={8}>{calculateRemainDates(userUsage?.end_on)}</Col>
            </Row>
          </>
        )}
      </div>

      <div
        className="mt-5 mb-5 container"
        style={{
          maxWidth: "1020px",
        }}
      >
        <div>
          <h3>Upgrade to SmartAIDoc plus</h3>

          <div
            style={{
              display: "flex",
              marginTop: "2rem",
            }}
          >
            <Row gutter={50} justify={"center"}>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <PricingCard
                    title={"Free"}
                    monthlyPrice={"$0"}
                    features={[
                      "120 pages/Document",
                      "10 MB/Document",
                      "3 Documents/day",
                      "50 questions/day",
                    ]}
                  />
                </div>
              </Col>

              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <div
                  style={{
                    minHeight: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <PricingCard
                    title={"plus"}
                    monthlyPrice={"$5"}
                    features={[
                      "2,000 pages/Document",
                      "32 MB/Document",
                      "50 Documents/day",
                      "1000 questions/day",
                    ]}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}
