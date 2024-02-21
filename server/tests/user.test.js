const express = require('express');
const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserController = require('../controllers/userController');

jest.mock('../models/User');
jest.mock('jsonwebtoken');

describe('UserController', () => {
  describe('POST /signup', () => {
    it('should return 201 and success message if account created successfully', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          username: 'testuser',
          password: 'password',
        },
      };

      const genSaltSyncMock = jest.spyOn(bcrypt, 'genSaltSync').mockReturnValue('salt');
      const hashMock = jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      const compareMock = jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      User.checkExistingUser.mockImplementation((username, callback) => {
        callback(null, 0); 
      });
      User.createUser.mockImplementation((email, username, password, callback) => {
        callback(null, 1); 
      });

      jwt.sign.mockReturnValue('token');

      const app = express();
      app.use(express.json());
      app.post('/signup', UserController.newUser);

      const response = await request(app).post('/signup').send(req.body);
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Account created successfully' });

      expect(genSaltSyncMock).toHaveBeenCalledWith(10);
      expect(hashMock).toHaveBeenCalledWith('password', 'salt');
      expect(compareMock).toHaveBeenCalledWith('password', 'hashedPassword');

      expect(jwt.sign).toHaveBeenCalledWith(
        { username: req.body.username, userId: 1 },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1d' }
      );
    });

  });

  describe('POST /login', () => {
    it('should return 200 and success message if login successful', async () => {
      const req = {
        body: {
          username: 'testuser',
          password: 'testpassword',
        },
      };
  
      bcrypt.compare.mockResolvedValue(true);
  
      User.getUserByUsername.mockImplementation((username, callback) => {
        callback(null, [{ id: 1, username: 'testuser', password: 'hashedPassword' }]);
      });
  
      jwt.sign.mockReturnValue('token');
  
      const app = express();
  
      app.use(express.json());
  
      app.post('/login', UserController.loginUser);
  
      const response = await request(app).post('/login').send(req.body);
  
      expect(response.status).toBe(200);
  
      expect(response.body).toEqual({ message: 'Successful login' });
    });
  
    it('should return 401 if username or password is incorrect', async () => {
      const req = {
        body: {
          username: 'testuser',
          password: 'wrongpassword',
        },
      };
  
      bcrypt.compare.mockResolvedValue(false);
  
      User.getUserByUsername.mockImplementation((username, callback) => {
        callback(null, [{ id: 1, username: 'testuser', password: 'hashedPassword' }]);
      });
  
      const app = express();
      app.use(express.json());

      app.post('/login', UserController.loginUser);
      const response = await request(app).post('/login').send(req.body);
  
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Wrong username or password' });
    });
  
  });

  describe('GET /suggestedPlayers', () => {
    it('should return suggested players', async () => {
      const req = {};
      UserController.filterUsers = jest.fn().mockImplementation((req, res) => {
        res.status(200).json({ message: 'Suggested players fetched successfully' });
      });
  
      const app = express();

      app.get('/suggestedPlayers', UserController.filterUsers);
      const response = await request(app).get('/suggestedPlayers');
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Suggested players fetched successfully' });
    });
  });
  
  describe('POST /Notifications', () => {
    it('should update notifications and return success message', async () => {
      const req = {};
      UserController.updateNotifications = jest.fn().mockImplementation((req, res) => {
        res.status(201).json({ message: 'Notifications updated successfully' });
      });
  
      const app = express();

      app.post('/Notifications', UserController.updateNotifications);
      const response = await request(app).post('/Notifications');

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Notifications updated successfully' });
    });
  });

  describe('POST /Profile', () => {
    it('should update user profile and return success message', async () => {
      const req = {};
      UserController.updateUser = jest.fn().mockImplementation((req, res) => {
        res.status(201).json({ message: 'Profile updated successfully' });
      });

      const app = express();

      app.post('/Profile', UserController.updateUser);
      const response = await request(app).post('/Profile');
  
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Profile updated successfully' });
    });
  });
  
  describe('PATCH /LevelUp', () => {
    it('should level up the user and return success message', async () => {
      const req = {};
      UserController.levelUpUser = jest.fn().mockImplementation((req, res) => {
        res.status(200).json({ message: 'User leveled up successfully' });
      });
 
      const app = express();

      app.patch('/LevelUp', UserController.levelUpUser);
      const response = await request(app).patch('/LevelUp');
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'User leveled up successfully' });
    });
  });

  describe('GET /user', () => {
    it('should get user information and return success message', async () => {
      const req = {};
      UserController.getUserByUserId = jest.fn().mockImplementation((req, res) => {
        res.status(200).json({ userData: { username: 'testuser', email: 'test@example.com' } });
      });


      const app = express();

      app.get('/user', UserController.getUserByUserId);
      const response = await request(app).get('/user');
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ userData: { username: 'testuser', email: 'test@example.com' } });
    });
  });
  
  describe('GET /user/filter', () => {
    it('should filter users and return success message', async () => {
      const req = {};
  
      UserController.filterUsers = jest.fn().mockImplementation((req, res) => {
        res.status(201).json({ message: 'Users filtered successfully' });
      });
  
      const app = express();
  
      app.get('/user/filter', UserController.filterUsers);
  
      const response = await request(app).get('/user/filter');
  
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Users filtered successfully' });
    });
  });
});
