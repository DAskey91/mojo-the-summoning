const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Card } = require('.')
const {db} = require('../db/config.js')

// define in global scope
let card

// clear db and create new attack before tests
beforeAll(async () => {
  await db.sync({ force: true })
  card = await Card.create({ 
    name: 'Wizard',
    mojo: 120,
    stamina: 100,
    imgUrl: 'test.url'
})
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Card', () => {
  it('has an id', async () => {
    expect(card).toHaveProperty('id')
  })

  it('name is correct', async () => {
    expect(card.name).toBe('Wizard')
  })

  it('mojo is correct', async () => {
    expect(card.mojo).toBe(120)
  })

  it('stamina is correct', async () => {
    expect(card.stamina).toBe(100)
  })
  it('ImgUrl is correct', async () => {
    expect(card.imgUrl).toBe('test.url')
  })
})