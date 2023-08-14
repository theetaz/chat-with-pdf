import styles from "./page.module.css";
import HeroPage from "@/view/HeroPage";

export const metadata = {
  title: "Chat with PDF",
  description: "Let's chat with PDF",
};

export default function Home() {
  return (
    
      <main className={styles.main}>
        <HeroPage />
      </main>
    
  );
}
