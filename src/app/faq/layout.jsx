import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function FaqLayout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
        }}
      >
        <NavBar />
      </div>
      <div
        style={{
          width: "100%",
        }}
      >
        {children}
      </div>

      <div className="mb-2">
        <Footer />
      </div>
    </div>
  );
}
