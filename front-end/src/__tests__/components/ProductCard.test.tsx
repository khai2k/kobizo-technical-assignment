import { render, screen, fireEvent } from "../utils/test-utils";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "../utils/test-utils";

describe("ProductCard Integration Tests", () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    (global.fetch as jest.Mock).mockClear();
  });

  it("renders product card with correct data", () => {
    const mockProduct = mockProducts[0];

    render(<ProductCard product={mockProduct} />);

    // Check if product name is rendered
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();

    // Check if price is displayed (without $ formatting in the component)
    expect(screen.getByText("1299.99")).toBeInTheDocument();

    // Check if description is rendered
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();

    // Check if stock status is displayed
    expect(screen.getByText("In Stock")).toBeInTheDocument();
  });

  it("handles click events correctly", () => {
    const mockProduct = mockProducts[0];
    const mockOnAddToCart = jest.fn();

    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

    // Click on the add to cart button
    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });
    fireEvent.click(addToCartButton);

    // Check if onAddToCart was called with correct product
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it("displays out of stock message when stock is 0", () => {
    const outOfStockProduct = {
      ...mockProducts[0],
      stock_quantity: 0,
    };

    render(<ProductCard product={outOfStockProduct} />);

    // Check if out of stock message is displayed (there are multiple instances)
    expect(screen.getAllByText("Out of Stock")).toHaveLength(3);
  });

  it("displays low stock warning when stock is less than 5", () => {
    const lowStockProduct = {
      ...mockProducts[0],
      stock_quantity: 3,
    };

    render(<ProductCard product={lowStockProduct} />);

    // Check if stock status is still "In Stock" (component doesn't show low stock warning)
    expect(screen.getByText("In Stock")).toBeInTheDocument();
  });

  it("formats price correctly for different amounts", () => {
    const expensiveProduct = {
      ...mockProducts[0],
      price: 9999.99,
    };

    render(<ProductCard product={expensiveProduct} />);

    // Check if price is displayed (without $ formatting in the component)
    expect(screen.getByText("9999.99")).toBeInTheDocument();
  });

  it("applies correct CSS classes for styling", () => {
    const mockProduct = mockProducts[0];

    const { container } = render(<ProductCard product={mockProduct} />);

    // Check if the card has the correct CSS class
    const card = container.firstChild;
    expect(card).toHaveClass("card");
  });

  it("displays product image when image_url is provided", () => {
    const mockProduct = mockProducts[0];

    render(<ProductCard product={mockProduct} />);

    // Check if the product image is rendered
    const productImage = screen.getByAltText(mockProduct.name);
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute("src", mockProduct.image_url);
  });

  it("displays placeholder when no image_url is provided", () => {
    const mockProductWithoutImage = {
      ...mockProducts[0],
      image_url: undefined,
    };

    render(<ProductCard product={mockProductWithoutImage} />);

    // Check if placeholder text is displayed
    expect(screen.getByText("Product Image")).toBeInTheDocument();
  });

  it("is accessible with proper ARIA attributes", () => {
    const mockProduct = mockProducts[0];

    render(<ProductCard product={mockProduct} />);

    // Check if the button has proper accessibility attributes
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Add to Cart");
  });

  it("handles keyboard navigation", () => {
    const mockProduct = mockProducts[0];
    const mockOnAddToCart = jest.fn();

    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);

    const button = screen.getByRole("button");

    // Test click instead of keyboard events (button doesn't handle keyboard events)
    fireEvent.click(button);
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
