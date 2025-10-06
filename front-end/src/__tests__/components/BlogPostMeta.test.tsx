import { render, screen } from "../utils/test-utils";
import BlogPostMeta from "@/components/BlogPostMeta";
import { mockBlogPosts } from "../utils/test-utils";

describe("BlogPostMeta Integration Tests", () => {
  it("renders author and published date correctly", () => {
    const mockPost = mockBlogPosts[0];

    render(<BlogPostMeta post={mockPost} />);

    // Check if author is displayed
    expect(screen.getByText(mockPost.author)).toBeInTheDocument();

    // Check if published date is formatted correctly
    expect(
      screen.getByText(/Published on January 1, 2023/)
    ).toBeInTheDocument();
  });

  it("calculates and displays read time correctly", () => {
    const mockPost = mockBlogPosts[0];

    render(<BlogPostMeta post={mockPost} />);

    // Check if read time is calculated (content has ~10 words = 1 min read)
    expect(screen.getByText(/1 min read/)).toBeInTheDocument();
  });

  it("handles different content lengths for read time calculation", () => {
    const longContentPost = {
      ...mockBlogPosts[0],
      content: "word ".repeat(500), // 500 words = 3 min read
    };

    render(<BlogPostMeta post={longContentPost} />);

    // Check if read time is calculated correctly for longer content
    expect(screen.getByText(/3 min read/)).toBeInTheDocument();
  });

  it("displays author name with proper styling", () => {
    const mockPost = mockBlogPosts[0];

    const { container } = render(<BlogPostMeta post={mockPost} />);

    // Check if author name has the correct CSS class
    const authorName = screen.getByText(mockPost.author);
    expect(authorName).toHaveClass("authorName");
  });

  it("displays read time badge with proper styling", () => {
    const mockPost = mockBlogPosts[0];

    const { container } = render(<BlogPostMeta post={mockPost} />);

    // Check if read time has the correct CSS class
    const readTime = screen.getByText(/1 min read/);
    expect(readTime).toHaveClass("readTimeText");
  });

  it("handles different date formats correctly", () => {
    const postWithDifferentDate = {
      ...mockBlogPosts[0],
      published_date: "2023-12-25T10:30:00Z",
    };

    render(<BlogPostMeta post={postWithDifferentDate} />);

    // Check if the date is formatted correctly
    expect(
      screen.getByText(/Published on December 25, 2023/)
    ).toBeInTheDocument();
  });
});
