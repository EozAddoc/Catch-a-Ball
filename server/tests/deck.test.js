const db = require('../db');
const User = require('../models/User');
const Deck = require('../models/Deck');

// Mocking the database query method
jest.mock('../db', () => ({
  query: jest.fn(),
}));

// Mocking the getUserByUserId method from the User class
jest.mock('../models/User', () => ({
  getUserByUserId: jest.fn(),
}));

describe('Deck Class Tests', () => {
  // Reset the mock implementations before each test
  beforeEach(() => {
    db.query.mockReset();
    User.getUserByUserId.mockReset();
  });

  // Test for createDeckTable
  it('should create deck table if not exists', async () => {
    db.query.mockImplementation(async () => {
      // Mock implementation for the query method
      return Promise.resolve(null);
    });

    await Deck.createDeckTable();

    expect(db.query).toHaveBeenCalledWith(expect.any(String));
    // Add more assertions based on your requirements
  });


  // Test for chooseForBattle
  it('should update chosen for battle status', async () => {
    db.query.mockImplementation(async () => {
      // Mock implementation for the query method
      return Promise.resolve({ affectedRows: 1 }); // Simulating a successful update
    });

    const callback = jest.fn();
    await Deck.chooseForBattle('card1', 1, callback);

    expect(db.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
    expect(callback).toHaveBeenCalledWith(null, 'Updated successfully');
    // Add more assertions based on your requirements
  });
  // Add more tests for other methods in the Deck class
});
