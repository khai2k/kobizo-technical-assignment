import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.title}>
          Kobizo Technical Assignment
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/products" className={styles.navLink}>
            Products
          </Link>
          <Link href="/blog" className={styles.navLink}>
            Blog
          </Link>
          <a href="#" className={styles.navLink}>
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
