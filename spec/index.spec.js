import Database from "../src/index.js";

describe('Database', () => {
    let database

    beforeEach(() => {
        database = new Database()
    })

    it('should exist', () => {
        expect(database).toBeInstanceOf(Database)
        expect(database.data.length).toBe(0)
    })

    it('should be able to add new data', () => {
        database.addData({name: 'something', age: 42})

        expect(database.data.length).toBe(1)
        expect(database.data[0].id).toBe(1)
        expect(database.data[0].name).toBe('something')
        expect(database.data[0].age).toBe(42)

        database.addData({name: 'something else', age: 22})

        expect(database.data.length).toBe(2)
        expect(database.data[1].id).toBe(2)
        expect(database.data[1].name).toBe('something else')
        expect(database.data[1].age).toBe(22)
    })
})