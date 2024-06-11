import Database from '../src/Database.js'

describe('Database', () => {
    let database

    beforeEach(() => {
        database = new Database()
    })

    it('should add item', () => {
        const item = { id: 1, name: 'Test Item' }
        database.add(item)
        expect(database.findById(1)).toEqual(item)
    })

    it('should remove item', () => {
        const item = { id: 1, name: 'Test Item' }
        database.add(item)
        database.remove(1)
        expect(() => database.findById(1)).toThrowError('Item not found')
    })

    it('should find item', () => {
        const item = { id: 1, name: 'Test Item' }
        database.add(item)
        expect(database.findById(1)).toEqual(item)
    })

    it('should update item', () => {
        const item = { id: 1, name: 'Test Item' }
        database.add(item)
        const updatedItem = { id: 1, name: 'Updated Test Item' }
        database.update(1, updatedItem)
        expect(database.findById(1).name).toEqual('Updated Test Item')
    })
})
