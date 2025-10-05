import styles from "./Main.module.css";

export default function Main() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <h2 className={styles.heroTitle}>Welcome to Kobizo</h2>
          <p className={styles.heroDescription}>
            A modern e-commerce platform built with Next.js, TypeScript, and CSS
            Modules.
          </p>
          <button className={styles.ctaButton}>Get Started</button>
        </section>

        <section className={styles.features}>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Fast & Responsive</h3>
              <p className={styles.featureDescription}>
                Built with Next.js for optimal performance and user experience.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Type Safe</h3>
              <p className={styles.featureDescription}>
                Full TypeScript support for better development experience.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Modern Styling</h3>
              <p className={styles.featureDescription}>
                CSS Modules for scoped, maintainable styles.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
