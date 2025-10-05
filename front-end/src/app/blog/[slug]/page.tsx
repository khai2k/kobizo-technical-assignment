import { notFound } from "next/navigation";
import { fetchBlogPosts, fetchBlogPost, BlogPost } from "@/lib/api";
import BlogPostContent from "@/components/BlogPostContent";
import BlogPostMeta from "@/components/BlogPostMeta";
import styles from "./page.module.css";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  try {
    const posts = await fetchBlogPosts();

    // Only generate paths for published posts
    const publishedPosts = posts.filter((post) => post.status === "published");

    return publishedPosts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await fetchBlogPost(params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.published_date,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await fetchBlogPost(params.slug);

  if (!post) {
    notFound();
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

// Enable ISR with 60 seconds revalidation
export const revalidate = 60;
