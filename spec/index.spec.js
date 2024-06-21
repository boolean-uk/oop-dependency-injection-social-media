import Database, { UserDatabase, PostDatabase } from "../src/index.js";

describe('Database', () => {
    let database

    beforeEach(() => {
        database = new Database()
    })

    it('should exist', () => {
        expect(database).toBeInstanceOf(Database)
        expect(database.data.size).toBe(0)
    })

    it('should be able to add new data', () => {
        database.addData({name: 'something', age: 42})

        expect(database.data.size).toBe(1)
        expect(database.data.get(1).id).toBe(1)
        expect(database.data.get(1).name).toBe('something')
        expect(database.data.get(1).age).toBe(42)

        database.addData({name: 'something else', age: 22})

        expect(database.data.size).toBe(2)
        expect(database.data.get(2).id).toBe(2)
        expect(database.data.get(2).name).toBe('something else')
        expect(database.data.get(2).age).toBe(22)
    })

    it('should throw an error when adding data that is not an object', () => {
        expect(() => database.addData('something')).toThrow('data must be an object')

        expect(database.data.size).toBe(0)
    })

    it('should find data by id', () => {
        database.addData({name: 'something', age: 42})
        database.addData({name: 'something else', age: 22})

        const result = database.findById(1)
        const result2 = database.findById(2)

        expect(result).toEqual({id: 1, name: 'something', age: 42})
        expect(result2).toEqual({id: 2, name: 'something else', age: 22})
    })

    it('should throw an error if data not found', () => {
        database.addData({name: 'something', age: 42})
        database.addData({name: 'something else', age: 22})

        expect(() => database.findById(3)).toThrow('data not found')
    })

    it('should throw an error if data not found when removing', () => {
        database.addData({name: 'something', age: 42})
        database.addData({name: 'something else', age: 22})

        expect(() => database.removeData(3)).toThrow('data not found')
    })

    it('should be able to remove data', () => {
        database.addData({name: 'something', age: 42})
        database.addData({name: 'something else', age: 22})

        const result = database.removeData(2)

        expect(result).toEqual({id: 2, name: 'something else', age: 22})
        expect(database.data.size).toBe(1)
    })

    it('should throw an error if data not found when updating', () => {
        database.addData({name: 'something', age: 42})
        database.addData({name: 'something else', age: 22})

        expect(() => database.updateData(3, {name: 'a test', age: 25})).toThrow('data not found')
    })

    it('should be able to update data', () => {
        database.addData({name: 'something', age: 42})
        database.addData({name: 'something else', age: 22})

        const result = database.updateData(2, {name: 'a test', age: 25})

        expect(result).toEqual({id: 2, name: 'a test', age: 25})
        expect(database.data.get(2)).toEqual({id: 2, name: 'a test', age: 25})
    })
})

describe('Userdatabase', () => {
    let userDatabase

    beforeEach(() => {
        userDatabase = new UserDatabase(new Database)
    })

    it('should exist', () => {
        expect(userDatabase).toBeInstanceOf(UserDatabase)
        expect(userDatabase.userData.size).toBe(0)
    })

    it('should be able to add new data', () => {
        userDatabase.addData({username: 'something', age: 42})

        expect(userDatabase.userData.size).toBe(1)
        expect(userDatabase.userData.get(1).id).toBe(1)
        expect(userDatabase.userData.get(1).username).toBe('something')
        expect(userDatabase.userData.get(1).age).toBe(42)

        userDatabase.addData({username: 'somethingelse', age: 22})

        expect(userDatabase.userData.size).toBe(2)
        expect(userDatabase.userData.get(2).id).toBe(2)
        expect(userDatabase.userData.get(2).username).toBe('somethingelse')
        expect(userDatabase.userData.get(2).age).toBe(22)
    })

    it('should throw an error when adding invalid data', () => {
        expect(() => userDatabase.addData({username: 'some', age: 42})).toThrow('data must have a unique username of no less than 6 characters long')

        expect(userDatabase.userData.size).toBe(0)

        expect(() => userDatabase.addData({name: 'some', age: 42})).toThrow('data must have a unique username of no less than 6 characters long')

        expect(userDatabase.userData.size).toBe(0)

        userDatabase.addData({username: 'something', age: 42})

        expect(() => userDatabase.addData({username: 'something', age: 42})).toThrow('data must have a unique username of no less than 6 characters long')

        expect(userDatabase.userData.size).toBe(1)
    })

    it('should throw an error when adding data that is not an object', () => {
        expect(() => userDatabase.addData('something')).toThrow('data must be an object')

        expect(userDatabase.userData.size).toBe(0)
    })

    it('should find data by id', () => {
        userDatabase.addData({username: 'something', age: 42})
        userDatabase.addData({username: 'somethingelse', age: 22})

        const result = userDatabase.findById(1)
        const result2 = userDatabase.findById(2)

        expect(result).toEqual({id: 1, username: 'something', age: 42})
        expect(result2).toEqual({id: 2, username: 'somethingelse', age: 22})
    })

    it('should throw an error if data not found', () => {
        userDatabase.addData({username: 'something', age: 42})
        userDatabase.addData({username: 'somethingelse', age: 22})

        expect(() => userDatabase.findById(3)).toThrow('data not found')
    })

    it('should throw an error if data not found when removing', () => {
        userDatabase.addData({username: 'something', age: 42})
        userDatabase.addData({username: 'somethingelse', age: 22})

        expect(() => userDatabase.removeData(3)).toThrow('data not found')
    })

    it('should be able to remove data', () => {
        userDatabase.addData({username: 'something', age: 42})
        userDatabase.addData({username: 'somethingelse', age: 22})

        const result = userDatabase.removeData(2)

        expect(result).toEqual({id: 2, username: 'somethingelse', age: 22})
        expect(userDatabase.userData.size).toBe(1)
    })

    it('should throw an error if data not found when updating', () => {
        userDatabase.addData({username: 'something', age: 42})
        userDatabase.addData({username: 'somethingelse', age: 22})

        expect(() => userDatabase.updateData(3, {username: 'testing', age: 25})).toThrow('data not found')
    })

    it('should be able to update data', () => {
        userDatabase.addData({username: 'something', age: 42})
        userDatabase.addData({username: 'somethingelse', age: 22})

        const result = userDatabase.updateData(2, {username: 'testing', age: 25})

        expect(result).toEqual({id: 2, username: 'testing', age: 25})
        expect(userDatabase.userData.get(2)).toEqual({id: 2, username: 'testing', age: 25})
    })
})

describe('Postdatabase', () => {
    let postDatabase

    beforeEach(() => {
        postDatabase = new PostDatabase(new Database)
    })

    it('should exist', () => {
        expect(postDatabase).toBeInstanceOf(PostDatabase)
        expect(postDatabase.postData.size).toBe(0)
    })

    it('should be able to add new data', () => {
        postDatabase.addData({title: 'something that is at least 5 words long', content: 'some content that should be at least 10 words long to test if everything works'})

        expect(postDatabase.postData.size).toBe(1)
        expect(postDatabase.postData.get(1).id).toBe(1)
        expect(postDatabase.postData.get(1).title).toBe('something that is at least 5 words long')
        expect(postDatabase.postData.get(1).content).toBe('some content that should be at least 10 words long to test if everything works')

        postDatabase.addData({title: 'something else that is at least 5 words long', content: 'more content that should be at least 10 words long to test if everything works'})

        expect(postDatabase.postData.size).toBe(2)
        expect(postDatabase.postData.get(2).id).toBe(2)
        expect(postDatabase.postData.get(2).title).toBe('something else that is at least 5 words long')
        expect(postDatabase.postData.get(2).content).toBe('more content that should be at least 10 words long to test if everything works')
    })

    it('should throw an error when adding invalid data', () => {
        expect(() => postDatabase.addData({title: 'something', content: 'some content'})).toThrow('post must have a title of no less than 5 words long and a content of no less tham 10 words long')

        expect(postDatabase.postData.size).toBe(0)

        expect(() => postDatabase.addData({something: 'something', somethingElse: 'some content'})).toThrow('post must have a title of no less than 5 words long and a content of no less tham 10 words long')
    })

    it('should throw an error when adding data that is not an object', () => {
        expect(() => postDatabase.addData('something')).toThrow('data must be an object')

        expect(postDatabase.postData.size).toBe(0)
    })

    it('should find data by id', () => {
        postDatabase.addData({title: 'something that is at least 5 words long', content: 'some content that should be at least 10 words long to test if everything works'})
        postDatabase.addData({title: 'something else that is at least 5 words long', content: 'more content that should be at least 10 words long to test if everything works'})

        const result = postDatabase.findById(1)
        const result2 = postDatabase.findById(2)

        expect(result).toEqual({id: 1, title: 'something that is at least 5 words long', content: 'some content that should be at least 10 words long to test if everything works'})
        expect(result2).toEqual({id: 2, title: 'something else that is at least 5 words long', content: 'more content that should be at least 10 words long to test if everything works'})
    })

    it('should throw an error if data not found', () => {
        postDatabase.addData({title: 'something that is at least 5 words long', content: 'some content that should be at least 10 words long to test if everything works'})
        postDatabase.addData({title: 'something else that is at least 5 words long', content: 'more content that should be at least 10 words long to test if everything works'})

        expect(() => postDatabase.findById(3)).toThrow('data not found')
    })

    it('should throw an error if data not found when removing', () => {
        postDatabase.addData({title: 'something that is at least 5 words long', content: 'some content that should be at least 10 words long to test if everything works'})
        postDatabase.addData({title: 'something that is at least 5 words long', content: 'some content that should be at least 10 words long to test if everything works'})

        expect(() => postDatabase.removeData(3)).toThrow('data not found')
    })

    it('should be able to remove data', () => {
        postDatabase.addData({title: 'something that is at least 5 words long', content: 'some content that should be at least 10 words long to test if everything works'})
        postDatabase.addData({title: 'something else that is at least 5 words long', content: 'more content that should be at least 10 words long to test if everything works'})

        const result = postDatabase.removeData(2)

        expect(result).toEqual({id: 2, title: 'something else that is at least 5 words long', content: 'more content that should be at least 10 words long to test if everything works'})
        expect(postDatabase.postData.size).toBe(1)
    })

    it('should throw an error if data not found when updating', () => {
        postDatabase.addData({title: 'something that is at least 5 words long', content: 'some content that should be at least 10 words long to test if everything works'})
        postDatabase.addData({title: 'something else that is at least 5 words long', content: 'more content that should be at least 10 words long to test if everything works'})

        expect(() => postDatabase.updateData(3, {title: 'a test that is at least 5 words long', content: 'test content that should be at least 10 words long to test if everything works'})).toThrow('data not found')
    })

    it('should be able to update data', () => {
        postDatabase.addData({title: 'something that is at least 5 words long', content: 'some content that should be at least 10 words long to test if everything works'})
        postDatabase.addData({title: 'something else that is at least 5 words long', content: 'more content that should be at least 10 words long to test if everything works'})

        const result = postDatabase.updateData(2, {title: 'a test that is at least 5 words long', content: 'test content that should be at least 10 words long to test if everything works'})

        expect(result).toEqual({id: 2, title: 'a test that is at least 5 words long', content: 'test content that should be at least 10 words long to test if everything works'})
        expect(postDatabase.postData.get(2)).toEqual({id: 2, title: 'a test that is at least 5 words long', content: 'test content that should be at least 10 words long to test if everything works'})
    })

    it('should throw an error if new data not valid', () => {
        postDatabase.addData({title: 'something that is at least 5 words long', content: 'some content that should be at least 10 words long to test if everything works'})
        postDatabase.addData({title: 'something else that is at least 5 words long', content: 'more content that should be at least 10 words long to test if everything works'})

        expect(() => postDatabase.updateData(2, {title: 'a test', content: 'test content'})).toThrow('post must have a title of no less than 5 words long and a content of no less tham 10 words long')

        expect(() => postDatabase.updateData(2, {something: 'a test', somethingElse: 'test content'})).toThrow('post must have a title of no less than 5 words long and a content of no less tham 10 words long')
    })
})