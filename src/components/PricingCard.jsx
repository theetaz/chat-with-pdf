"use client";

import { Button, Card, List } from "antd";
import { Footer } from "antd/es/layout/layout";
const PricingCard = (props) => (
  <Card
    title={props.title}
    bordered={false}
    style={{
      width: 300,
      minHeight: "100%",
    }}
  >
    <div>
      <p>
        <span
          style={{
            fontSize: "22px",
            fontWeight: "700",
          }}
        >
          {props.monthlyPrice}
        </span>
        /mo
      </p>
    </div>
    <div>
      <List>
        {props?.features?.map((feature, index) => (
          <List.Item key={index}>{feature}</List.Item>
        ))}
      </List>
    </div>
    <Footer className={`${props.title}-footer`}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button type="primary">Get Plus</Button>
      </div>
    </Footer>
  </Card>
);

export default PricingCard;
