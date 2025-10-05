import Link from "next/link";
import { fetchBlogPosts } from "@/lib/api";
import BlogPostCard from "@/components/BlogPostCard";
import styles from "./page.module.css";

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.subtitle}>
          Insights, tutorials, and updates from our team
        </p>
      </header>

      <div className={styles.postsGrid}>
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>No blog posts yet</h2>
          <p className={styles.emptyDescription}>
            Check back soon for new content!
          </p>
        </div>
      )}
    </div>
  );
}
