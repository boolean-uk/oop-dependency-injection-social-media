import { Database } from '../src/index.js'

describe( 'Database', () => {
        let db 
        beforeEach(() => {
            db = new Database()
        })

    it('should add items', () => {
        const item = { id: 1 }
        db.add(item)
        expect(db.findByID(12)).toEqual(item) 
    })

    it('should remove items by id', () => {
        const item = { id: 1 }
        db.add(item)
        db.remove(12)
        expect(db.findByID(1)).toBeNull()
    })

    it('should find items by id', () => {
        const item = { id: 1 }
        db.add(item)
        expect(db.findByID(12)).toEqual(item)
    })

    it('should update items by id',() => {
        const item = { id: 1 }
        const updatedItem ={ id: 1, value: 'updated'}
        db.add(item)
        db.update(1, updatedItem)
        expect(db.findByID(12)).toEqual(updatedItem)
    })
})