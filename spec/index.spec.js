import Database, { UserDatabase, PostDatabase, User, Post } from "../src/index.js";

describe('Database', () => {
    let database
    let postDatabase
    let userDatabase
    beforeEach(() => {
        database = new Database()
        userDatabase = new UserDatabase()
        postDatabase = new PostDatabase()
    })
    it('should add any data to the database array', () => {
        const user = new User(1, 'billybob', 'newpassword')
        database.add(user)
        expect(database.entries.length).toBe(1)
        expect(database.entries[0].username).toBe('billybob')
    })
    it('should find data by ID', () => {
        const user = new User(1, 'billybob', 'newpassword')
        database.add(user)
        const find = database.findByID(1)
        expect(find.username).toBe('billybob')
    })
    it('should remove data by id', () => {
        const user = new User(1, 'billybob', 'newpassword')
        database.add(user)
        const user1 = new User(2, 'Jimothy', 'jdizzle')
        database.add(user1)
        const removed = database.remove(1)
        expect(database.entries.length).toBe(1)
        expect(database.entries[0].username).toBe('Jimothy')
    })
    it('should add a user to the database array', () => {
        userDatabase.addUser('billybob', 'newpassword')
        expect(userDatabase.entries.length).toBe(1)
        expect(userDatabase.entries[0].username).toBe('billybob')
    })
    it('should find a username to check if it already exists', () => {
        userDatabase.addUser('Jimothy', 'jdizzle')
        userDatabase.addUser('billybob', 'newpassword')
        const findUserName = userDatabase.findUserName('Jimothy')
        expect(findUserName).toEqual(new User(1, 'Jimothy', 'jdizzle'))
    })
    it('should find a user by ID', () => {
        userDatabase.addUser('Jimothy', 'jdizzle')
        userDatabase.addUser('billybob', 'newpassword')
        const found = userDatabase.findUserByID(1)
        expect(found).toEqual(new User(1, 'Jimothy', 'jdizzle'))
    })
})