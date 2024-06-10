import exp from "constants";
import Database, { UserDatabase, PostDatabase, User, Post } from "../src/index.js";

describe('Database', () => {
    let database
    beforeEach(() => {
        database = new Database()
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
})
describe('UserDatabase', () => {
    let userDatabase
    beforeEach(() => {
        userDatabase = new UserDatabase()
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
    it('should remove a user', () => {
        userDatabase.addUser('Jimothy', 'jdizzle')
        userDatabase.addUser('billybob', 'newpassword')
        userDatabase.removeUser(2)
        expect(userDatabase.entries.length).toBe(1)
        expect(userDatabase.entries[0].username).toBe('Jimothy')
    })
})
describe('PostDatabase', () => {
    let postDatabase
    beforeEach(() => {
        postDatabase = new PostDatabase()
    })
    it('should add a post to the database', () => {
        postDatabase.addPost('First Post on the site', 'So excited to try this new social media today wow')
        expect(postDatabase.entries.length).toBe(1)
        expect(postDatabase.entries[0].title).toBe('First Post on the site')
    })
    it('should remove a post by ID', () => {
        postDatabase.addPost('First Post on the site', 'So excited to try this new social media today wow')
        postDatabase.addPost('Trying out a new post', 'Testing to see if the new site is up and running')
        postDatabase.removePost(1)
        expect(postDatabase.entries.length).toBe(1)
        expect(postDatabase.entries[0].title).toBe('Trying out a new post')
    })
})