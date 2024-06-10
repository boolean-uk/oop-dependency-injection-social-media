import Database, { UserDatabase, PostDatabase } from "../src/index.js";

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

    it('should throw an error if data not found when updating', () => {
        database.addData({id: 1, name: 'something', age: 42})
        database.addData({id: 2, name: 'something else', age: 22})

        expect(() => database.updateData(3)).toThrow('data not found')
    })

    it('should be able to update data', () => {
        database.addData({id: 1, name: 'something', age: 42})
        database.addData({id: 2, name: 'something else', age: 22})

        const result = database.updateData(2, {id: 2, name: 'a test', age: 25})

        expect(result).toEqual({id: 2, name: 'a test', age: 25})
        expect(database.data[1]).toEqual({id: 2, name: 'a test', age: 25})
    })
})

describe('Userdatabase', () => {
    let userDatabase

    beforeEach(() => {
        userDatabase = new UserDatabase(new Database)
    })

    it('should exist', () => {
        expect(userDatabase).toBeInstanceOf(UserDatabase)
        expect(userDatabase.userData.length).toBe(0)
    })

    it('should be able to add new data', () => {
        userDatabase.addData({id: 1, name: 'something', age: 42})

        expect(userDatabase.userData.length).toBe(1)
        expect(userDatabase.userData[0].id).toBe(1)
        expect(userDatabase.userData[0].name).toBe('something')
        expect(userDatabase.userData[0].age).toBe(42)

        userDatabase.addData({id: 2, name: 'something else', age: 22})

        expect(userDatabase.userData.length).toBe(2)
        expect(userDatabase.userData[1].id).toBe(2)
        expect(userDatabase.userData[1].name).toBe('something else')
        expect(userDatabase.userData[1].age).toBe(22)
    })

    it('should throw an error when adding data without an id', () => {
        expect(() => userDatabase.addData({name: 'something', age: 42})).toThrow('data must have an id')

        expect(userDatabase.userData.length).toBe(0)
    })

    it('should throw an error when adding data that is not an object', () => {
        expect(() => userDatabase.addData('something')).toThrow('data must be an object')

        expect(userDatabase.userData.length).toBe(0)
    })

    it('should find data by id', () => {
        userDatabase.addData({id: 1, name: 'something', age: 42})
        userDatabase.addData({id: 2, name: 'something else', age: 22})

        const result = userDatabase.findById(1)
        const result2 = userDatabase.findById(2)

        expect(result).toEqual({id: 1, name: 'something', age: 42})
        expect(result2).toEqual({id: 2, name: 'something else', age: 22})
    })

    it('should throw an error if data not found', () => {
        userDatabase.addData({id: 1, name: 'something', age: 42})
        userDatabase.addData({id: 2, name: 'something else', age: 22})

        expect(() => userDatabase.findById(3)).toThrow('data not found')
    })

    it('should throw an error if data not found when removing', () => {
        userDatabase.addData({id: 1, name: 'something', age: 42})
        userDatabase.addData({id: 2, name: 'something else', age: 22})

        expect(() => userDatabase.removeData(3)).toThrow('data not found')
    })

    it('should be able to remove data', () => {
        userDatabase.addData({id: 1, name: 'something', age: 42})
        userDatabase.addData({id: 2, name: 'something else', age: 22})

        const result = userDatabase.removeData(2)

        expect(result).toEqual({id: 2, name: 'something else', age: 22})
        expect(userDatabase.userData.length).toBe(1)
    })

    it('should throw an error if data not found when updating', () => {
        userDatabase.addData({id: 1, name: 'something', age: 42})
        userDatabase.addData({id: 2, name: 'something else', age: 22})

        expect(() => userDatabase.updateData(3)).toThrow('data not found')
    })

    it('should be able to update data', () => {
        userDatabase.addData({id: 1, name: 'something', age: 42})
        userDatabase.addData({id: 2, name: 'something else', age: 22})

        const result = userDatabase.updateData(2, {id: 2, name: 'a test', age: 25})

        expect(result).toEqual({id: 2, name: 'a test', age: 25})
        expect(userDatabase.userData[1]).toEqual({id: 2, name: 'a test', age: 25})
    })

    describe('Postdatabase', () => {
        let postDatabase
    
        beforeEach(() => {
            postDatabase = new PostDatabase(new Database)
        })
    
        it('should exist', () => {
            expect(postDatabase).toBeInstanceOf(PostDatabase)
            expect(postDatabase.postData.length).toBe(0)
        })
    
        it('should be able to add new data', () => {
            postDatabase.addData({id: 1, name: 'something', age: 42})
    
            expect(postDatabase.postData.length).toBe(1)
            expect(postDatabase.postData[0].id).toBe(1)
            expect(postDatabase.postData[0].name).toBe('something')
            expect(postDatabase.postData[0].age).toBe(42)
    
            postDatabase.addData({id: 2, name: 'something else', age: 22})
    
            expect(postDatabase.postData.length).toBe(2)
            expect(postDatabase.postData[1].id).toBe(2)
            expect(postDatabase.postData[1].name).toBe('something else')
            expect(postDatabase.postData[1].age).toBe(22)
        })
    
        it('should throw an error when adding data without an id', () => {
            expect(() => postDatabase.addData({name: 'something', age: 42})).toThrow('data must have an id')
    
            expect(postDatabase.postData.length).toBe(0)
        })
    
        it('should throw an error when adding data that is not an object', () => {
            expect(() => postDatabase.addData('something')).toThrow('data must be an object')
    
            expect(postDatabase.postData.length).toBe(0)
        })
    
        it('should find data by id', () => {
            postDatabase.addData({id: 1, name: 'something', age: 42})
            postDatabase.addData({id: 2, name: 'something else', age: 22})
    
            const result = postDatabase.findById(1)
            const result2 = postDatabase.findById(2)
    
            expect(result).toEqual({id: 1, name: 'something', age: 42})
            expect(result2).toEqual({id: 2, name: 'something else', age: 22})
        })
    
        it('should throw an error if data not found', () => {
            postDatabase.addData({id: 1, name: 'something', age: 42})
            postDatabase.addData({id: 2, name: 'something else', age: 22})
    
            expect(() => postDatabase.findById(3)).toThrow('data not found')
        })
    
        it('should throw an error if data not found when removing', () => {
            postDatabase.addData({id: 1, name: 'something', age: 42})
            postDatabase.addData({id: 2, name: 'something else', age: 22})
    
            expect(() => postDatabase.removeData(3)).toThrow('data not found')
        })
    
        it('should be able to remove data', () => {
            postDatabase.addData({id: 1, name: 'something', age: 42})
            postDatabase.addData({id: 2, name: 'something else', age: 22})
    
            const result = postDatabase.removeData(2)
    
            expect(result).toEqual({id: 2, name: 'something else', age: 22})
            expect(postDatabase.postData.length).toBe(1)
        })
    
        it('should throw an error if data not found when updating', () => {
            postDatabase.addData({id: 1, name: 'something', age: 42})
            postDatabase.addData({id: 2, name: 'something else', age: 22})
    
            expect(() => postDatabase.updateData(3)).toThrow('data not found')
        })
    
        it('should be able to update data', () => {
            postDatabase.addData({id: 1, name: 'something', age: 42})
            postDatabase.addData({id: 2, name: 'something else', age: 22})
    
            const result = postDatabase.updateData(2, {id: 2, name: 'a test', age: 25})
    
            expect(result).toEqual({id: 2, name: 'a test', age: 25})
            expect(postDatabase.postData[1]).toEqual({id: 2, name: 'a test', age: 25})
        })
    })
})