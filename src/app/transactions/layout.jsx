import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function ProfileLayout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        
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

      <div className="mb-2" style={{}}>
        <Footer />
      </div>
    </div>
  );
}
