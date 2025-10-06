import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleSkeleton}></div>
        <div className={styles.subtitleSkeleton}></div>
      </header>

      <div className={styles.postsGrid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className={styles.cardSkeleton}>
            <div className={styles.cardTitleSkeleton}></div>
            <div className={styles.cardContentSkeleton}></div>
            <div className={styles.cardContentSkeleton}></div>
            <div className={styles.cardContentSkeletonShort}></div>
            <div className={styles.cardMetaSkeleton}>
              <div className={styles.cardAuthorSkeleton}></div>
              <div className={styles.cardDateSkeleton}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
