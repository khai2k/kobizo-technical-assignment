import { BlogPost } from "@/lib/api";
import styles from "./BlogPostMeta.module.css";

interface BlogPostMetaProps {
  post: BlogPost;
}

export default function BlogPostMeta({ post }: BlogPostMetaProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={styles.meta}>
      <div className={styles.author}>
        <div className={styles.authorInfo}>
          <span className={styles.authorName}>{post.author}</span>
          <span className={styles.publishDate}>
            Published on {formatDate(post.published_date)}
          </span>
        </div>
      </div>

      <div className={styles.readTime}>
        <span className={styles.readTimeText}>
          {Math.ceil(post.content.split(" ").length / 200)} min read
        </span>
      </div>
    </div>
  );
}
