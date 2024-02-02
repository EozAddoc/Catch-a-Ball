// const User = require('../../models/User');
// const db = require('../../db');

// // Mocking the database query method
// jest.mock('../../db');

// describe('User Class Tests', () => {
//   // Reset the mock implementation before each test
//   beforeEach(() => {
//     db.query.mockReset();
//   });

//   // Test for createUserTableIfNotExists
//   it('should create user table if not exists', async () => {
//     db.query.mockImplementation((query, callback) => {
//       // Mock implementation for the query method
//       callback(null);
//     });

//     await User.createUserTableIfNotExists();

//     expect(db.query).toHaveBeenCalledWith(expect.any(String), expect.any(Function));
//     // Add more assertions based on your requirements
//   });

//   // Test for createUser
//   it('should create a new user', async () => {
//     db.query.mockImplementation((query, values, callback) => {
//       // Mock implementation for the query method
//       callback(null, { insertId: 1 }); // Simulating a successful insert
//     });

//     const callback = jest.fn();
//     await User.createUser('test@example.com', 'testuser', 'password123', callback);

//     expect(db.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array), expect.any(Function));
//     expect(callback).toHaveBeenCalledWith(null, 1); // Expecting the user ID
//     // Add more assertions based on your requirements
//   });
//   // Test for getUserByUsernameAndPassword
//   it('should fetch user by username and password', async () => {
//     db.query.mockImplementation(async () => {
//       // Mock implementation for the query method
//       return Promise.resolve([{ id: 1, username: 'testUser', password: 'password' }]);
//     });

//     const user = await User.getUserByUsernameAndPassword('testUser', 'password', jest.fn());

//     expect(db.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array),expect.any(Function));
//     expect(user).toBeDefined();
//     // Add more assertions based on your requirements
//   });

//   // Test for checkExistingUser
//   it('should check if a user already exists', async () => {
//     db.query.mockImplementation(async () => {
//       // Mock implementation for the query method
//       return Promise.resolve([{ count: 1 }]); // Simulating that the user exists
//     });

//     const userExists = await User.checkExistingUser('existingUser', jest.fn());

//     expect(db.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array),expect.any(Function));
//     expect(userExists).toBeTruthy();
//     // Add more assertions based on your requirements
//   });

//   // Test for getUserByUserId
//   it('should fetch user by user id', async () => {
//     db.query.mockImplementation(async () => {
//       // Mock implementation for the query method
//       return Promise.resolve([{ id: 1, username: 'testUser' }]);
//     });

//     const user = await User.getUserByUserId(1);

//     expect(db.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array),expect.any(Function));
//     expect(user).toBeDefined();
//     // Add more assertions based on your requirements
//   });

//   // Test for filterUsers
//   it('should filter users based on given data', async () => {
//     db.query.mockImplementation(async () => {
//       // Mock implementation for the query method
//       return Promise.resolve([{ id: 1, username: 'filteredUser' }]);
//     });

//     const filterData = { username: 'filteredUser' };
//     const callback = jest.fn();
//     await User.filterUsers(filterData, callback);

//     expect(callback).toHaveBeenCalledWith(expect.any(Array));
//     // Add more assertions based on your requirements
//   });

//   // Test for addAvatar
//   it('should add an avatar to the user', async () => {
//     db.query.mockImplementation(async () => {
//       // Mock implementation for the query method
//       return Promise.resolve(null); // Simulating a successful update
//     });

//     const callback = jest.fn();
//     await User.addAvatar(1, 'avatar_url', callback);
//     expect(db.query).toHaveBeenCalledWith(
//         'UPDATE users SET avatar_api = ? WHERE id = ?',
//         ['avatar_url', 1]
//       );
//     expect(db.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
//     expect(callback).toHaveBeenCalledWith(expect.anything(), 'Avatar added successfully');
//     // Add more assertions based on your requirements
//   });

//   // Test for updateNotificationArray
//   it('should update the notification array for the user', async () => {
//     db.query.mockImplementation(async () => {
//       // Mock implementation for the query method
//       return Promise.resolve(null); // Simulating a successful update
//     });

//     await User.updateNotificationArray(1, ['New notification']);

//     expect(db.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
//     // Add more assertions based on your requirements
//   });

//   // Test for levelUp
//   it('should level up the user', async () => {
//     db.query.mockImplementation(async () => {
//       return Promise.resolve(null); 
//     });

//     await User.levelUp(1);

//     expect(db.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
//   });

//   // Test for updateUser
//   it('should update user information', async () => {
//     db.query.mockImplementation(async () => {
//       return Promise.resolve(null); // Simulating a successful update
//     });

//     const callback = jest.fn();
//     await User.updateUser(1, { username: 'updatedUser' }, callback);

//     expect(db.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
//     expect(callback).toHaveBeenCalledWith(expect.any(Array));
//     // Add more assertions based on your requirements
//   },15000);


// });
