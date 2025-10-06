import styles from "./BlogPostSkeleton.module.css";

export default function BlogPostSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSkeleton}></div>
        <div className={styles.metaSkeleton}>
          <div className={styles.authorSkeleton}></div>
          <div className={styles.dateSkeleton}></div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.paragraphSkeleton}></div>
        <div className={styles.paragraphSkeleton}></div>
        <div className={styles.paragraphSkeleton}></div>
        <div className={styles.paragraphSkeletonShort}></div>
      </div>
    </div>
  );
}
