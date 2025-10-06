"use client";

import { useBlogPost } from "@/hooks/useBlog";
import BlogPostContent from "@/components/BlogPostContent";
import BlogPostMeta from "@/components/BlogPostMeta";
import styles from "./page.module.css";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { data: post, isLoading, error } = useBlogPost(params.slug);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h1>Blog Post Not Found</h1>
          <p>The requested blog post could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        <BlogPostMeta post={post} />
      </header>

      <div className={styles.content}>
        <BlogPostContent content={post.content} />
      </div>
    </article>
  );
}
