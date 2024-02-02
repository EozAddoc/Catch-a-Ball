const UserController = require('../../controllers/userController');
const User = require('../../models/User');
const Battle = require('../../models/Battle');
const jwt = require('jsonwebtoken');

// Mocking external dependencies
jest.mock('../../models/User');
jest.mock('../../models/Battle');
jest.mock('jsonwebtoken');

describe('UserController', () => {
  describe('newUser', () => {
    it('should create a new user and return a success message', async () => {
      // Set up your test data
      const req = {
        body: {
          email: 'test@example.com',
          username: 'testuser',
          password: 'password123',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        cookie: jest.fn(),
      };

      // Mock the relevant User methods
      User.createUserTableIfNotExists.mockResolvedValue();
      Battle.createBattleTableIfNotExists.mockResolvedValue();
      User.checkExistingUser.mockImplementation((username, callback) => {
        callback(null, 0); // Simulate that the user does not exist
      });
      User.createUser.mockImplementation((email, username, password, callback) => {
        callback(null, 'fakeUserId');
      });
      jwt.sign.mockReturnValue('fakeToken');

      // Call the controller method
      await UserController.newUser(req, res);

      // Assert that the expected methods were called
      expect(User.createUserTableIfNotExists).toHaveBeenCalledTimes(1);
      expect(Battle.createBattleTableIfNotExists).toHaveBeenCalledTimes(1);
      expect(User.checkExistingUser).toHaveBeenCalledTimes(1);
      expect(User.createUser).toHaveBeenCalledTimes(1);
      expect(jwt.sign).toHaveBeenCalledTimes(1);
      expect(res.cookie).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Account created successfully' });

      // Clean up mocks
      jest.clearAllMocks();
    });

    // Add more test cases for different scenarios, such as existing user, errors, etc.
  });

  // Add tests for other UserController methods in a similar manner
});
