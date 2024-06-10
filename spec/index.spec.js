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
})
