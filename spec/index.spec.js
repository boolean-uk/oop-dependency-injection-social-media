import Database, {
    DatabaseFactory,
    UserDatabase,
    PostDatabase,
    IdCreator,
    UserPost,
} from '../src/index.js'

describe('database', () => {
    let database
    beforeEach(() => {
        database = new Database()
    })

    it('successfully initializes an empty array', () => {
        expect(database.database.length).toBe(0)
    })

    it('adds an item to the database', () => {
        const item = { id: 1, name: 'Test Item' }
        database.addItem(item)
        expect(database.database.length).toBe(1)
        expect(database.database[0]).toEqual(item)
    })

    it('removes an item from the database', () => {
        const item = { id: 1, name: 'Test Item' }
        database.addItem(item)
        database.removeItem(1)
        expect(database.database.length).toBe(0)
    })

    it('searches an item by id', () => {
        const item = { id: 1, name: 'Test Item' }
        database.addItem(item)
        const foundItem = database.searchById(1)
        expect(foundItem).toEqual(item)
    })

    it('throws an error when updating a non-existent item', () => {
        const item = { id: 1, name: 'Updated Item' }
        expect(() => {
            database.updateItem(item)
        }).toThrowError(
            'An item does not exist with this ID, if you wish to add a new item use the addItem method.'
        )
    })

    it('updates an existing item', () => {
        const item = { id: 1, name: 'Test Item' }
        database.addItem(item)
        const updatedItem = { id: 1, name: 'Updated Item' }
        database.updateItem(updatedItem)
        expect(database.searchById(1).name).toBe('Updated Item')
    })
})

describe('user database', () => {
    let userDatabase
    const factory = new DatabaseFactory()
    let idCreator = new IdCreator()

    beforeEach(() => {
        userDatabase = factory.create(UserDatabase)
    })

    it('successfully initializes an empty database', () => {
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

    it('throws an error when adding a user with a username shorter than 6 characters', () => {
        const user = { username: 'Tony' }
        expect(() => {
            userDatabase.addUser(idCreator.create(), user)
        }).toThrowError('Username must be 6 characters long')
    })

    it('throws an error when adding a user with a duplicate username', () => {
        const user1 = { username: 'TonyDanzaFan28' }
        const user2 = { username: 'TonyDanzaFan28' }
        userDatabase.addUser(idCreator.create(), user1)
        expect(() => {
            userDatabase.addUser(idCreator.create(), user2)
        }).toThrowError('Usernames must be unique')
    })

    it('removes a user from the database', () => {
        const user = { username: 'TonyDanzaFan28' }

        const userInfo = userDatabase.addUser(idCreator.create(), user)

        userDatabase.removeUser(userInfo.id)

        expect(userDatabase.viewDatabase().length).toBe(0)
        expect(userDatabase.searchByName('TonyDanzaFan28')).toBe(undefined)
    })

    it('throws an error when removing a non-existent user', () => {
        expect(() => {
            userDatabase.removeUser('non-existent-id')
        }).not.toThrowError()
    })

    it('successfully updates a user', () => {
        const user = { username: 'TonyDanzaFan28' }

        const userInfo = userDatabase.addUser(idCreator.create(), user)

        const userUpdated = { username: 'TonyDanzaSux82', updated: true }

        userDatabase.updateUser(userInfo.id, userUpdated)

        expect(userDatabase.viewDatabase().length).toBe(1)
        expect(userDatabase.searchByName('TonyDanzaSux82').updated).toBe(true)
    })

    it('throws an error when updating a user with a username shorter than 6 characters', () => {
        const user = { username: 'TonyDanzaFan28' }

        const userInfo = userDatabase.addUser(idCreator.create(), user)

        const userUpdated = { username: 'Tony', updated: true }

        expect(() => {
            userDatabase.updateUser(userInfo.id, userUpdated)
        }).toThrowError('Username must be 6 characters long')
    })

    it('throws an error when updating a user with a duplicate username', () => {
        const user1 = { username: 'TonyDanzaFan28' }
        const user2 = { username: 'AnotherFan42' }

        userDatabase.addUser(idCreator.create(), user1)
        const userInfo2 = userDatabase.addUser(idCreator.create(), user2)

        const userUpdated = { username: 'TonyDanzaFan28', updated: true }

        expect(() => {
            userDatabase.updateUser(userInfo2.id, userUpdated)
        }).toThrowError('Usernames must be unique')
    })

    it('allows a user to create a post in their database', () => {
        const user = { username: 'TonyDanzaFan28' }

        const post = {
            title: 'I swear this is a title',
            content:
                "I seriously have to write at least 10 words? That's insane!",
        }

        const id = idCreator.create()

        const currentUser = userDatabase.addUser(id, user)

        currentUser.posts.addPost(idCreator.create(), post)

        expect(currentUser.posts.viewDatabase()[0].title).toBe(
            'I swear this is a title'
        )
    })

    it('uses the userpost class to create the post', () => {
        const user = { username: 'TonyDanzaFan28' }

        const post = {
            title: 'I swear this is a title',
            content:
                "I seriously have to write at least 10 words? That's insane!",
        }

        const id = idCreator.create()

        const currentUser = userDatabase.addUser(id, user)

        new UserPost(idCreator.create(),currentUser, post).createPost()

        expect(currentUser.posts.viewDatabase()[0].title).toBe(
            'I swear this is a title'
        )
    })
})

describe('post database', () => {
    let postDatabase
    const factory = new DatabaseFactory()
    let idCreator = new IdCreator()

    beforeEach(() => {
        postDatabase = factory.create(PostDatabase)
    })

    it('successfully initializes an empty database', () => {
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

    it('throws an error when adding a post with a title shorter than 5 words', () => {
        const post = {
            title: 'Short title',
            content:
                "I seriously have to write at least 10 words? That's insane!",
        }
        expect(() => {
            postDatabase.addPost(idCreator.create(), post)
        }).toThrowError('title must be 5 words long')
    })

    it('throws an error when adding a post with content shorter than 10 words', () => {
        const post = {
            title: 'This title is long enough',
            content: 'Short content',
        }
        expect(() => {
            postDatabase.addPost(idCreator.create(), post)
        }).toThrowError('content must be 10 words long')
    })

    it('throws an error when adding a post with a duplicate id', () => {
        const post1 = {
            title: 'I swear this is a title',
            content:
                "I seriously have to write at least 10 words? That's insane!",
        }
        const post2 = {
            title: 'It is a valid title here',
            content:
                'Here is another post content that has more than ten words, just to make sure it passes the test.',
        }
        const id = idCreator.create()
        postDatabase.addPost(id, post1)
        expect(() => {
            postDatabase.addPost(id, post2)
        }).toThrowError('Id already in use')
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
        expect(postDatabase.searchByTitle('I swear this is a title')).toBe(
            undefined
        )
    })

    it('throws an error when removing a non-existent post', () => {
        expect(() => {
            postDatabase.removePost('non-existent-id')
        }).not.toThrowError()
    })

    it('successfully updates a post', () => {
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
        expect(
            postDatabase.searchByTitle('I swear this is a title').updated
        ).toBe(true)
    })

    it('throws an error when updating a post with a title shorter than 5 words', () => {
        const post = {
            title: 'I swear this is a title',
            content:
                "I seriously have to write at least 10 words? That's insane!",
        }

        const postInfo = postDatabase.addPost(idCreator.create(), post)

        const postUpdated = {
            title: 'Short title',
            content:
                "I seriously have to write at least 10 words? That's insane!",
        }

        expect(() => {
            postDatabase.updatePost(postInfo.id, postUpdated)
        }).toThrowError('title must be 5 words long')
    })

    it('throws an error when updating a post with content shorter than 10 words', () => {
        const post = {
            title: 'I swear this is a title',
            content:
                "I seriously have to write at least 10 words? That's insane!",
        }

        const postInfo = postDatabase.addPost(idCreator.create(), post)

        const postUpdated = {
            title: 'I swear this is a title',
            content: 'Short content',
        }

        expect(() => {
            postDatabase.updatePost(postInfo.id, postUpdated)
        }).toThrowError('content must be 10 words long')
    })
})
