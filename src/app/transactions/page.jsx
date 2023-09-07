"use client";
import PricingCard from "@/components/PricingCard";
import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Transactions() {
  const router = useRouter();

  const [urlObject, setUrlObject] = useState(null);

  const manageSub = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/createportal",
        {
          test: "test",
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
              Free
            </p>
          </div>
          <div>
            <Button onClick={manageSub}>Manage Subscription</Button>
          </div>
        </div>
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
          <Col span={8}>free</Col>
        </Row>
        <Row>
          <Col span={8}>
            <p
              style={{
                color: "#828391",
              }}
            >
              Characters used
            </p>
          </Col>
          <Col span={8}>0 / 10,000</Col>
        </Row>
        <Row>
          <Col span={8}>
            <p
              style={{
                color: "#828391",
              }}
            >
              Next character reset in
            </p>
          </Col>
          <Col span={8}>30 days</Col>
        </Row>
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
