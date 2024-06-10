import Database, {
    DatabaseFactory,
    UserDatabase,
    PostDatabase,
    IdCreator,
} from '../src/index.js'

describe('database', () => {
    let database
    beforeEach(() => {
        database = new Database()
    })

    it('succesfully initialises an empty array', () => {
        expect(database.database.length).toBe(0)
    })
})

describe('user database', () => {
    let userDatabase
    const factory = new DatabaseFactory()
    let idCreator = new IdCreator()

    beforeEach(() => {
        userDatabase = factory.create(UserDatabase)
    })

    it('succesfully initialises an empty database', () => {
        expect(userDatabase.viewDatabase().length).toBe(0)
    })

    it('adds a user to the database', () => {
        const user = { username: 'TonyDanzaFan28' }

        userDatabase.addUser(idCreator.create(), user)

        expect(userDatabase.viewDatabase().length).toBe(1)
        expect(userDatabase.searchByName('TonyDanzaFan28').username).toBe(
            'TonyDanzaFan28'
        )
    })

    it('removes a user from the database', () => {
        const user = { username: 'TonyDanzaFan28' }

        const userInfo = userDatabase.addUser(idCreator.create(), user)

        userDatabase.removeUser(userInfo.id)

        expect(userDatabase.viewDatabase().length).toBe(0)
        expect(userDatabase.searchByName('TonyDanzaFan28')).toBe(undefined)
    })

    it('succesfully updates a user', () => {
        const user = { username: 'TonyDanzaFan28' }

        const userInfo = userDatabase.addUser(idCreator.create(), user)

        const userUpdated = { username: 'TonyDanzaSux82', updated: true }

        userDatabase.updateUser(userInfo.id, userUpdated)

        expect(userDatabase.viewDatabase().length).toBe(1)
        expect(userDatabase.searchByName('TonyDanzaSux82').updated).toBe(true)
    })
})

describe('post database', () => {
    let postDatabase
    const factory = new DatabaseFactory()
    let idCreator = new IdCreator()

    beforeEach(() => {
        postDatabase = factory.create(PostDatabase)
    })

    it('succesfully initialises an empty database', () => {
        expect(postDatabase.viewDatabase().length).toBe(0)
    })

    it('adds a post to the database', () => {
        const post = {
            title: 'I swear this is a title',
            content:
                "I seriously have to write at least 10 words? That's insane!",
        }

        postDatabase.addPost(idCreator.create(), post)

        expect(postDatabase.viewDatabase().length).toBe(1)
        expect(
            postDatabase.searchByTitle('I swear this is a title').title
        ).toBe('I swear this is a title')
    })

    it('removes a post from the database', () => {
        const post = {
            title: 'I swear this is a title',
            content:
                "I seriously have to write at least 10 words? That's insane!",
        }

        const postInfo = postDatabase.addPost(idCreator.create(), post)

        postDatabase.removePost(postInfo.id)

        expect(postDatabase.viewDatabase().length).toBe(0)
        expect(postDatabase.searchByTitle('I swear this is a title')).toBe(undefined)
    })

    it('succesfully updates a post', () => {
        const post = {
            title: 'I swear this is a title',
            content:
                "I seriously have to write at least 10 words? That's insane!",
        }

        const postInfo = postDatabase.addPost(idCreator.create(), post)

        const postUpdated = {
            title: 'I swear this is a title',
            content:
                "I seriously have to write at least 10 words? That's insane!",
            updated: true,
        }

        postDatabase.updatePost(postInfo.id, postUpdated)

        expect(postDatabase.viewDatabase().length).toBe(1)
        expect(postDatabase.searchByTitle('I swear this is a title').updated).toBe(true)
    })
})
