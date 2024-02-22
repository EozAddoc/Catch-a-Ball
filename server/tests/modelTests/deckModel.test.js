const db = require('../../db');
const User = require('../../models/User');
const Deck = require('../../models/Deck');

// Mocking the database query method
jest.mock('../../db', () => ({
  query: jest.fn(),
}));

// Mocking the getUserByUserId method from the User class
jest.mock('../../models/User', () => ({
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

//   // Test for getDeckByUserId
//   it('should fetch deck by user id', async () => {
//     const userId = 1;

//     User.getUserByUserId.mockImplementation(() => {
//       // Mock implementation for the getUserByUserId method
//       return Promise.resolve({ id: userId }); // Simulating a successful user fetch
//     });

//     db.query.mockImplementation(async () => {
//       // Mock implementation for the query method
//       return Promise.resolve([{ id: 1, card_api: 'card1', Experience: 0, Chosen_For_Battle: false }]);
//     });

//     const deck = await Deck.getDeckByUserId(userId);

//     expect(User.getUserByUserId).toHaveBeenCalledWith(userId);
//     expect(db.query).toHaveBeenCalledWith(expect.any(String), [userId]);
//     expect(deck).toBeDefined();
//     // Add more assertions based on your requirements
//   },10000);


  // Test for addCards
  it('should add cards to the deck', async () => {
    db.query.mockImplementation(async () => {
      // Mock implementation for the query method
      return Promise.resolve({ insertId: 1 }); // Simulating a successful insert
    });

    const callback = jest.fn();
    await Deck.addCards(1, ['card1', 'card2'], callback);

    expect(db.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
    expect(callback).toHaveBeenCalledWith(null, 'Cards added successfully');
    // Add more assertions based on your requirements
  },15000);

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

