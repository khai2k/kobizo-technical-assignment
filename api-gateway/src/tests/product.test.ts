import request from 'supertest';
import app from '../index';
import { directusService } from '../config/directus';

// Mock the Directus service
jest.mock('../config/directus');
const mockedDirectusService = directusService as jest.Mocked<typeof directusService>;

// Mock JWT token for authenticated requests
const mockToken = 'mock-jwt-token';

describe('Product Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/v1/products', () => {
    it('should return products for authenticated user', async () => {
      const mockProducts = [
        {
          id: '1',
          name: 'Product 1',
          description: 'Description 1',
          price: 100,
          category: 'Category 1',
          image: 'image1.jpg',
          stock: 10,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
        },
        {
          id: '2',
          name: 'Product 2',
          description: 'Description 2',
          price: 200,
          category: 'Category 2',
          image: 'image2.jpg',
          stock: 5,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
        },
      ];

      mockedDirectusService.getProducts.mockResolvedValue(mockProducts);

      // Mock JWT verification
      jest.spyOn(require('jsonwebtoken'), 'verify').mockReturnValue({
        user: { id: '1', email: 'test@example.com' },
      });

      const response = await request(app)
        .get('/api/v1/products')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0]).toHaveProperty('id', '1');
      expect(response.body.data[0]).toHaveProperty('name', 'Product 1');
    });

    it('should return 401 for unauthenticated request', async () => {
      const response = await request(app).get('/api/v1/products');

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it('should return 500 when Directus service fails', async () => {
      mockedDirectusService.getProducts.mockRejectedValue(new Error('Directus error'));

      // Mock JWT verification
      jest.spyOn(require('jsonwebtoken'), 'verify').mockReturnValue({
        user: { id: '1', email: 'test@example.com' },
      });

      const response = await request(app)
        .get('/api/v1/products')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/products/:id', () => {
    it('should return specific product for authenticated user', async () => {
      const mockProduct = {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        price: 100,
        category: 'Category 1',
        image: 'image1.jpg',
        stock: 10,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
      };

      mockedDirectusService.getProductById.mockResolvedValue(mockProduct);

      // Mock JWT verification
      jest.spyOn(require('jsonwebtoken'), 'verify').mockReturnValue({
        user: { id: '1', email: 'test@example.com' },
      });

      const response = await request(app)
        .get('/api/v1/products/1')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id', '1');
      expect(response.body.data).toHaveProperty('name', 'Product 1');
    });

    it('should return 404 for non-existent product', async () => {
      mockedDirectusService.getProductById.mockResolvedValue(null);

      // Mock JWT verification
      jest.spyOn(require('jsonwebtoken'), 'verify').mockReturnValue({
        user: { id: '1', email: 'test@example.com' },
      });

      const response = await request(app)
        .get('/api/v1/products/999')
        .set('Authorization', `Bearer ${mockToken}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
