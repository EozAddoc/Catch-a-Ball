const request = require('supertest');
const express = require('express');
const { body } = require('express-validator');
const User = require('../../models/User');
const userController = require('../../controllers/userController');
const authenticateToken = require('../../middleware/authenticateToken');

const app = express();

// Mocking dependencies
jest.mock('express-validator');
jest.mock('../../models/User');
jest.mock('../../controllers/userController');
jest.mock('../../middleware/authenticateToken');

// Import your routes file
const userRoutes = require('../../routes/userRoute');

// Use the routes in the Express app
app.use(express.json());
app.use('/', userRoutes);

describe('User Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /signup', () => {
    it('should return 201 when creating a new user', async () => {
      // Mock the necessary dependencies
      const mockValidationResult = {
        array: jest.fn().mockReturnValue([]),
      };

      body.mockReturnValueOnce({
        isEmail: jest.fn().mockReturnValue(mockValidationResult),
        notEmpty: jest.fn().mockReturnValue(mockValidationResult),
      });

      userController.newUser.mockImplementation((req, res) => res.status(201).json({ message: 'Account created successfully' }));

      // Perform the request
      const response = await request(app)
        .post('/signup')
        .send({ email: 'test@example.com', username: 'testuser', password: 'password123' });

      // Assertions
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Account created successfully' });
    });
    });

    // Add more test cases for validation, error handling, etc.
  });

  // Add similar tests for other routes like "/signup/avatar", "/login", etc.

  describe('GET /user', () => {
    it('should return user data when authenticated', async () => {
      // Mock authentication middleware
      authenticateToken.mockImplementation((req, res, next) => {
        req.userId = 'fakeUserId'; // Assuming a fake user ID
        next();
      });

      // Mock getUserByUserId method
      User.getUserByUserId.mockResolvedValue({ id: 'fakeUserId', username: 'testuser' });

      // Perform the request
      const response = await request(app)
        .get('/user');

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        Status: 'Success',
        userData: { id: 'fakeUserId', username: 'testuser' },
      });
    });

    // Add more test cases for error handling, missing authentication, etc.
  });

