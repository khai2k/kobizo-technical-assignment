import styles from "./page.module.css";
import Header from "@/components/Header";
import Main from "@/components/Main";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Main />
    </div>
  );
}
