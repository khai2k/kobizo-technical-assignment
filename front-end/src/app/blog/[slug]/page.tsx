import { notFound } from "next/navigation";
import { Metadata } from "next";
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

    // Return all blog posts for static generation
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for blog posts:", error);
    return [];
  }
}

// Enable ISR with 60 seconds revalidation
export const revalidate = 60;

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await fetchBlogPost(params.slug);

    if (!post) {
      return {
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const description = post.content.substring(0, 160).replace(/\n/g, " ");

    return {
      title: post.title,
      description,
      openGraph: {
        title: post.title,
        description,
        url: `https://your-domain.com/blog/${post.slug}`,
        type: "article",
        publishedTime: post.published_date,
        authors: [post.author],
      },
      twitter: {
        card: "summary",
        title: post.title,
        description,
        creator: `@${post.author.replace(/\s/g, "")}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post",
      description: "A blog post from our collection",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
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
  } catch (error) {
    console.error("Error fetching blog post:", error);
    notFound();
  }
}
