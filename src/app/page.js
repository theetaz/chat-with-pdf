import styles from "./page.module.css";
import HeroPage from "@/view/HeroPage";

export const metadata = {
  title: "Smart AI Doc",
  description: "Let's chat with docs",
};

export default function Home() {
  return (
    
      <main className={styles.main}>
        <HeroPage />
      </main>
    
  );
}
