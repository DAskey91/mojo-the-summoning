const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Deck, Attack, Card, User } = require('.')
const {db} = require('../db/config.js')

describe('Relationships', () => {
    it('cards belong to deck', async () => {
        
        deck = await Deck.create({ 
            name: 'Beginner',
            xp: 10
        })

        card0 = await deck.createCard({ 
            name: 'Wizard',
            mojo: 120,
            stamina: 100,
            imgUrl: 'test.url'
        })

        card1 = await deck.createCard({ 
            name: 'Dragon',
            mojo: 150,
            stamina: 200,
            imgUrl: 'test2.url'
        })

    const cards = await deck.getCards();    
      expect(cards[0].name).toBe('Wizard')
      expect(cards[1].name).toBe('Dragon')
    })

    it('cards belong to deck', async () => {
        
        user = await User.create({ username: 'gandalf'})

        deck = await user.createDeck({ 
            name: 'Beginner',
            xp: 10
        })

    const checkDeck = await user.getDeck();    
      expect(checkDeck.name).toBe('Beginner')
    })
    
    it('card and attacks are related', async () => {
        
       const card = await Card.create({ 
            name: 'Wizard',
            mojo: 120,
            stamina: 100,
            imgUrl: 'test.url'
        })

     const   attack = await Attack.create({
        title: 'fire',
        mojoCost: 50,
        staminaCost: 10
        })    

        await card.addAttack(attack)
        await attack.addCard(card)

        const associatedAttacks = await card.getAttacks()
        expect(associatedAttacks).toHaveLength(1)
        expect(associatedAttacks[0].title).toBe('fire')

        const associatedCards = await attack.getCards()
        expect(associatedCards).toHaveLength(1)
        expect(associatedCards[0].name).toBe('Wizard')
    }
)
})
