const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Attack } = require('.')
const {db} = require('../db/config.js')

// define in global scope
let attack

// clear db and create new attack before tests
beforeAll(async () => {
  await db.sync({ force: true })
  attack = await Attack.create({ 
    title: 'fire',
    mojoCost: 50,
    staminaCost: 10
})
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Attack', () => {
  it('has an id', async () => {
    expect(attack).toHaveProperty('id')
  })

  it('title is correct', async () => {
    expect(attack.title).toBe('fire')
  })

  it('mojoCost is correct', async () => {
    expect(attack.mojoCost).toBe(50)
  })

  it('staminaCost is correct', async () => {
    expect(attack.staminaCost).toBe(10)
  })
})