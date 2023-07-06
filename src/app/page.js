import styles from "./page.module.css";
import HeroPage from "@/view/HeroPage";

export default function Home() {
  return (
    <main className={styles.main}>
      <HeroPage />
    </main>
  );
}
