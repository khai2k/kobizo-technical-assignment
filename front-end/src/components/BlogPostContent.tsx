import styles from "./BlogPostContent.module.css";

interface BlogPostContentProps {
  content: string;
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  // Parse and render markdown-like content
  const parseContent = (content: string) => {
    // Split content into paragraphs
    const paragraphs = content.split("\n\n");

    return paragraphs.map((paragraph, index) => {
      // Check if paragraph is a heading
      if (paragraph.startsWith("# ")) {
        return (
          <h1 key={index} className={styles.heading1}>
            {paragraph.replace("# ", "")}
          </h1>
        );
      }

      if (paragraph.startsWith("## ")) {
        return (
          <h2 key={index} className={styles.heading2}>
            {paragraph.replace("## ", "")}
          </h2>
        );
      }

      if (paragraph.startsWith("### ")) {
        return (
          <h3 key={index} className={styles.heading3}>
            {paragraph.replace("### ", "")}
          </h3>
        );
      }

      // Check if paragraph is a list
      if (paragraph.startsWith("- ") || paragraph.startsWith("* ")) {
        const listItems = paragraph.split("\n").filter((item) => item.trim());
        return (
          <ul key={index} className={styles.list}>
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex} className={styles.listItem}>
                {item.replace(/^[-*] /, "")}
              </li>
            ))}
          </ul>
        );
      }

      // Regular paragraph
      if (paragraph.trim()) {
        return (
          <p key={index} className={styles.paragraph}>
            {paragraph}
          </p>
        );
      }

      return null;
    });
  };

  return <div className={styles.content}>{parseContent(content)}</div>;
}
