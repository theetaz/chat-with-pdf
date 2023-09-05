"use client";
import { Button } from "antd";
import axios from "axios";

const StripeCheckoutButton = () => {
  const handleCheckout = async () => {
    console.log("handleCheckout");

    const { data } = await axios.post(
      "/api/payment",
      {
        priceId: "price_1Nmu3eDroRPwlsvPtnLDptMx",
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
