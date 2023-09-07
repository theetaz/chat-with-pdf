"use client";
import { Button } from "antd";
import axios from "axios";
import { useSession } from "next-auth/react";
import jwt from "jsonwebtoken";
import { useEffect } from "react";
import { useState } from "react";

const StripeCheckoutButton = () => {
  const [userId, setUserId] = useState(null);

  const { data: session } = useSession();
  console.log("checkout :", session?.accessToken);

  //decode jwt and get userId

  useEffect(() => {
    if (session?.accessToken) {
      const decoded = jwt.decode(session?.accessToken);
      console.log("decoded :", decoded.userid);
      setUserId(decoded.userid);
    }
  }, [session]);

  const handleCheckout = async () => {
    console.log("handleCheckout");

    const { data } = await axios.post(
      "/api/payment",
      {
        priceId: "price_1NnHKbDroRPwlsvPkmbly8oS",
        userId: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.assign(data);
  };

  return (
    <div>
      <Button type="primary" onClick={handleCheckout}>
        Get Plus
      </Button>
    </div>
  );
};

export default StripeCheckoutButton;
