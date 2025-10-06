import { Metadata } from "next";
import { fetchBlogPosts } from "@/lib/api";
import BlogPostCard from "@/components/BlogPostCard";
import styles from "./page.module.css";

// Enable ISR with 60 seconds revalidation
export const revalidate = 60;

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "Blog - Insights and Updates",
  description:
    "Discover insights, tutorials, and updates from our team. Stay informed with our latest blog posts covering technology, development, and industry trends.",
  openGraph: {
    title: "Blog - Insights and Updates",
    description: "Discover insights, tutorials, and updates from our team.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Blog - Insights and Updates",
    description: "Discover insights, tutorials, and updates from our team.",
  },
};

export default async function BlogPage() {
  try {
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
  } catch (error) {
    console.error("Error fetching blog posts:", error);

    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Error loading blog posts</h2>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }
}
