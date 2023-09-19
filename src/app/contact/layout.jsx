import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function ContactLayout({ children }) {
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
      {children}
      <div className="mb-2 mt-4">
        <Footer />
      </div>
    </div>
  );
}
