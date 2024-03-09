const db = require('../db');
const Battle = require('../models/Battle');
const request = require('supertest');
const express = require('express');
const battleController = require('../controllers/battleController');

jest.mock('../db');

describe('Battle Class Tests', () => {
  beforeEach(() => {
    db.query.mockReset();
  });

  it('should create battle table if not exists', async () => {
    db.query.mockImplementation(async () => {
      return Promise.resolve(null);
    });

    await Battle.createBattleTableIfNotExists();

    expect(db.query).toHaveBeenCalledWith(expect.any(String));
  });

  it('should create a new battle', async () => {
    db.query.mockImplementation(async () => {
      return Promise.resolve({ insertId: 1 }); // Simulating a successful insert
    });

    const winner = await Battle.createBattle(1, 2);

    expect(db.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
    expect(winner).toBeDefined();
  });

  it('should fetch battles in progress for a user', async () => {
    db.query.mockImplementation(async () => {
      return Promise.resolve([{ id: 1, status: 'InProgress' }]);
    });

    const battlesInProgress = await Battle.getInProgress(1);

    expect(db.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
    expect(battlesInProgress).toBeDefined();
    // Add more assertions based on your requirements
  });

  // Test for endBattle
  it('should end a battle', async () => {
    db.query.mockImplementation(async () => {
      // Mock implementation for the query method
      return Promise.resolve({ affectedRows: 1 }); // Simulating a successful update
    });

    const result = await Battle.endBattle(1);

    expect(db.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
    expect(result).toBeDefined();
  });

  // Test for determineWinner
  it('should determine a winner based on battle levels', async () => {
    db.query.mockImplementation(async (query, values) => {
      // Mock implementation for the query method
      if (query.includes('SELECT battleLvl FROM users')) {
        return Promise.resolve([{ battleLvl: 5 }]);
      }
    });

    const winner = await Battle.determineWinner(1, 2);

    expect(db.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
    expect(winner).toBeDefined();
  });

});
