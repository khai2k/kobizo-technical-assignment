import Link from "next/link";
import { BlogPost } from "@/lib/api";
import styles from "./BlogPostCard.module.css";

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const readTime = Math.ceil(post.content.split(" ").length / 200);

  return (
    <article className={styles.card}>
      <Link href={`/blog/${post.slug}`} className={styles.link}>
        <div className={styles.content}>
          <h2 className={styles.title}>{post.title}</h2>
          <p className={styles.excerpt}>{post.content.substring(0, 150)}...</p>

          <div className={styles.meta}>
            <div className={styles.author}>
              <span className={styles.authorName}>{post.author}</span>
            </div>

            <div className={styles.dateAndTime}>
              <span className={styles.date}>
                {formatDate(post.published_date)}
              </span>
              <span className={styles.readTime}>{readTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
