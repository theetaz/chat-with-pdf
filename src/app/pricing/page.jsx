import PricingCard from "@/components/PricingCard";

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
      <div style={{
        marginBottom: "2rem"
      }}>
        <h3>Upgrade to SmartAIDoc plus</h3>
      </div>

      <div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              marginRight: "1rem",
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
          <div style={{
            minHeight: "100%",
          }}>
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
        </div>
      </div>
    </div>
  );
}
