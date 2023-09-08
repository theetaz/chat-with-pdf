"use client";
import { Button, Row, Col } from "antd";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  // const router = useRouter();

  // const [urlObject, setUrlObject] = useState(null);

  // const manageSubs = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.post(
  //       "/api/createportal",
  //       {
  //         test: "test",
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log("data :", data);
  //     setUrlObject(data);
  //   } catch (error) {
  //     console.log("error :", error);
  //   }
  // };

  // //if url is ready redirect to stripe portal

  // useEffect(() => {
  //   if (urlObject) {
  //     const url = urlObject.url;
  //     console.log("url :", url);
  //     router.push(url);
  //   }
  // }, [urlObject]);

  return (
    <>
      <div
        style={{
          width: "100%",
          paddingTop: "20px",
        }}
      >
        <Row>
          <Col span={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={"/user_image.png"}
                width={150}
                height={150}
                alt="user_image"
              />
            </div>
          </Col>
          <Col
            span={12}
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "start",
                flexDirection: "column",
                fontSize: "18px",
                width: "100%",
                paddingRight: "50px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#FFF",
                  padding: "5px 15px",
                  borderRadius: "10px",
                  width: "100%",
                  marginBottom: "30px",
                }}
              >
                Kusal Kalinga
              </div>
              <div
                style={{
                  backgroundColor: "#FFF",
                  padding: "5px 15px",
                  borderRadius: "10px",
                  width: "100%",
                  marginBottom: "30px",
                }}
              >
                test@test.com
              </div>
              <div
                style={{
                  backgroundColor: "#FFF",
                  padding: "5px 15px",
                  borderRadius: "10px",
                  width: "100%",
                  marginBottom: "30px",
                }}
              >
                Plus User
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {/* <Button onClick={manageSubs}>Manage Subscription</Button> */}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
