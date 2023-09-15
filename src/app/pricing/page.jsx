import PricingCard from "@/components/PricingCard";
import { Col, Row } from "antd";

export default function Pricing() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="pricing-page-title">
        <h3>Upgrade to SmartAIDoc plus</h3>
      </div>

      <div>
        <div
          style={{
            display: "flex",
          }}
        >
          <Row gutter={50} justify={"center"}>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <div
                style={{
                  height: "100%",
                }}
                className="pricing-page-pricing-card"
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

            <Col
              xxl={12}
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={24}
              className="pricing-page-pricing-card-col"
            >
              <div
                style={{
                  minHeight: "100%",
                }}
                className="pricing-page-pricing-card"
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
  );
}
