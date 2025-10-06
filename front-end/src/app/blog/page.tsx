"use client";

import { useBlogPosts } from "@/hooks/useBlog";
import BlogPostCard from "@/components/BlogPostCard";
import styles from "./page.module.css";

export default function BlogPage() {
  const { data: posts = [], isLoading, error } = useBlogPosts();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading blog posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Error loading blog posts</h2>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

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
