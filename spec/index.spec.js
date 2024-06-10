import Database, { UserDatabase, PostDatabase } from '../src/index.js'

describe('Database', () => {
    let database
    let user
    let post

    beforeEach(() => {
        database = new Database()
        user = new UserDatabase(database)
        post = new PostDatabase(database)
    })

    it('should be able to add an user or an post', () => {
        user.data.add('LeonardoSaraceli')
        post.data.add('First Post', 'First Content')

        expect(database.data).toEqual(
            [
                [1, 'LeonardoSaraceli'],
                [2, 'First Post', 'First Content']
            ]
        )
    })
})