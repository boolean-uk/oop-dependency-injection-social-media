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
        database.addData({id: 1, name: 'something', age: 42})

        expect(database.data.length).toBe(1)
        expect(database.data[0].id).toBe(1)
        expect(database.data[0].name).toBe('something')
        expect(database.data[0].age).toBe(42)

        database.addData({id: 2, name: 'something else', age: 22})

        expect(database.data.length).toBe(2)
        expect(database.data[1].id).toBe(2)
        expect(database.data[1].name).toBe('something else')
        expect(database.data[1].age).toBe(22)
    })

    it('should throw an error when adding data without an id', () => {
        expect(() => database.addData({name: 'something', age: 42})).toThrow('data must have an id')

        expect(database.data.length).toBe(0)
    })

    it('should throw an error when adding data that is not an object', () => {
        expect(() => database.addData('something')).toThrow('data must be an object')

        expect(database.data.length).toBe(0)
    })

    it('should find data by id', () => {
        database.addData({id: 1, name: 'something', age: 42})
        database.addData({id: 2, name: 'something else', age: 22})

        const result = database.findById(1)
        const result2 = database.findById(2)

        expect(result).toEqual({id: 1, name: 'something', age: 42})
        expect(result2).toEqual({id: 2, name: 'something else', age: 22})
    })

    it('should throw an error if data not found', () => {
        database.addData({id: 1, name: 'something', age: 42})
        database.addData({id: 2, name: 'something else', age: 22})

        expect(() => database.findById(3)).toThrow('data not found')
    })

    it('should throw an error if data not found when removing', () => {
        database.addData({id: 1, name: 'something', age: 42})
        database.addData({id: 2, name: 'something else', age: 22})

        expect(() => database.removeData(3)).toThrow('data not found')
    })

    it('should be able to remove data', () => {
        database.addData({id: 1, name: 'something', age: 42})
        database.addData({id: 2, name: 'something else', age: 22})

        const result = database.removeData(2)

        expect(result).toEqual({id: 2, name: 'something else', age: 22})
        expect(database.data.length).toBe(1)
    })
})