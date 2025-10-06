import { render, screen, waitFor } from "../utils/test-utils";
import BlogPostCard from "@/components/BlogPostCard";
import { mockBlogPosts } from "../utils/test-utils";

// Mock Next.js Link
jest.mock("next/link", () => {
  return ({ children, href, ...props }: any) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

describe("BlogPostCard Integration Tests", () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    (global.fetch as jest.Mock).mockClear();
  });

  it("renders blog post card with correct data", () => {
    const mockPost = mockBlogPosts[0];

    render(<BlogPostCard post={mockPost} />);

    // Check if the title is rendered
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();

    // Check if the author is rendered
    expect(screen.getByText(mockPost.author)).toBeInTheDocument();

    // Check if the content excerpt is rendered
    expect(
      screen.getByText(/This is a comprehensive guide/)
    ).toBeInTheDocument();

    // Check if the link has correct href
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/blog/${mockPost.slug}`);
  });

  it("displays formatted date correctly", () => {
    const mockPost = mockBlogPosts[0];

    render(<BlogPostCard post={mockPost} />);

    // Check if the formatted date is displayed
    expect(screen.getByText(/Jan 1, 2023/)).toBeInTheDocument();
  });

  it("calculates and displays read time correctly", () => {
    const mockPost = mockBlogPosts[0];

    render(<BlogPostCard post={mockPost} />);

    // Check if read time is calculated and displayed
    // Content has ~10 words, so should be 1 min read (200 words per minute)
    expect(screen.getByText(/1 min read/)).toBeInTheDocument();
  });

  it("handles long content with ellipsis", () => {
    const longContentPost = {
      ...mockBlogPosts[0],
      content:
        "This is a very long content that should be truncated with ellipsis. ".repeat(
          20
        ),
    };

    render(<BlogPostCard post={longContentPost} />);

    // Check if content is truncated
    const excerpt = screen.getByText(/This is a very long content/);
    expect(excerpt.textContent).toContain("...");
  });

  it("applies correct CSS classes for styling", () => {
    const mockPost = mockBlogPosts[0];

    const { container } = render(<BlogPostCard post={mockPost} />);

    // Check if the card has the correct CSS class
    const card = container.firstChild;
    expect(card).toHaveClass("card");
  });

  it("is accessible with proper ARIA attributes", () => {
    const mockPost = mockBlogPosts[0];

    render(<BlogPostCard post={mockPost} />);

    // Check if the article has proper semantic structure
    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();

    // Check if the heading is properly structured
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(mockPost.title);
  });
});
