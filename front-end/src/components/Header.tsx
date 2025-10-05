import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>Kobizo Technical Assignment</h1>
        <nav className={styles.nav}>
          <a href="#" className={styles.navLink}>
            Home
          </a>
          <a href="#" className={styles.navLink}>
            Products
          </a>
          <a href="#" className={styles.navLink}>
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
