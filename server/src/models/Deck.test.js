const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Deck } = require('.')
const {db} = require('../db/config.js')

// define in global scope
let deck

// clear db and create new attack before tests
beforeAll(async () => {
  await db.sync({ force: true })
  deck = await Deck.create({ 
    name: 'Beginner',
    xp: 10
})
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Deck', () => {
  it('has an id', async () => {
    expect(deck).toHaveProperty('id')
  })

  it('name is correct', async () => {
    expect(deck.name).toBe('Beginner')
  })

  it('xp is correct', async () => {
    expect(deck.xp).toBe(10)
  })
})