import styles from "./page.module.css";
import HeroPage from "@/view/HeroPage";

export const metadata = {
  title: "Smart AI Doc",
  description:
    "Your smart AI document reader & analyzer - similar to ChatGPT but for PDFs, CSVs, Excel, and PowerPoint documents. Summarize and respond to questions intelligently",
};

export default function Home() {
  return (
    <main className={styles.main}>
      <HeroPage />
    </main>
  );
}
