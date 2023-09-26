const Deck = require('../models/Deck');
const deckController = require('../controllers/deckController');

// You might want to mock Express request and response objects
const { mockRequest, mockResponse } = require('jest-express');

describe('deckController', () => {
  it('should add cards successfully', async () => {
    // Mock Express request and response objects
    const req = mockRequest({
      body: {
        api_Ids: ['card1', 'card2'],
        username: 'testUser',
      },
    });
    const res = mockResponse();

    // Mock the methods in the Deck module
    Deck.createUser_DeckTableIfNotExists = jest.fn();
    Deck.addCards = jest.fn((username, api_Ids, callback) => {
      // Simulate a successful card addition
      callback(null);
    });

    // Call the addCards method
    await deckController.addCards(req, res);

    // Expectations
    expect(Deck.createUser_DeckTableIfNotExists).toHaveBeenCalled();
    expect(Deck.addCards).toHaveBeenCalledWith(
      'testUser',
      ['card1', 'card2'],
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Cards added successfully' });
  });

  it('should handle errors gracefully', async () => {
    // Mock Express request and response objects
    const req = mockRequest({
      body: {
        api_Ids: ['card1', 'card2'],
        username: 'testUser',
      },
    });
    const res = mockResponse();

    // Mock the methods in the Deck module to simulate an error
    Deck.createUser_DeckTableIfNotExists = jest.fn();
    Deck.addCards = jest.fn((username, api_Ids, callback) => {
      // Simulate an error during card addition
      callback(new Error('Card addition failed'));
    });

    // Call the addCards method
    await deckController.addCards(req, res);

    // Expectations
    expect(Deck.createUser_DeckTableIfNotExists).toHaveBeenCalled();
    expect(Deck.addCards).toHaveBeenCalledWith(
      'testUser',
      ['card1', 'card2'],
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});
