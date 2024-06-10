export default class Database {
    #database

    constructor(database = []) {
        this.#database = database
    }

    get database() {
        return [...this.#database]
    }

    addItem(item) {
        this.#database.push(item)
        return this.database
    }

    removeItem(id) {
        const newdatabase = this.#database.filter((element) => {
            return !(element.id === id)
        })

        this.#database = newdatabase

        return this.database
    }

    searchById(id) {
        const searchTarget = this.#database.find((element) => {
            return element.id === id
        })

        return searchTarget
    }

    updateItem(item) {
        let foundItem = this.searchById(item.id)

        if (!foundItem) {
            throw new Error(
                'An item does not exist with this ID, if you wish to add a new item use the addItem method.'
            )
        }

        Object.keys(item).forEach((element) => {
            foundItem[element] = item[element]
        })
    }
}

class FunctionalDatabase {
    #database

    constructor(database) {
        this.#database = database
    }

    viewDatabase() {
        return this.#database.database
    }

    searchByKey(key, value) {
        const searchTarget = this.viewDatabase().find((element) => {
            return element[key] === value
        })

        return searchTarget
    }

    searchById(id) {
        return this.#database.searchById(id)
    }

    addItem(item) {
        this.#database.addItem(item)
        return this.viewDatabase()
    }

    removeItem(id) {
        this.#database.removeItem(id)
        return this.viewDatabase()
    }

    updateItem(id, data) {
        this.#database.updateItem({ id, ...data })
        return this.viewDatabase()
    }
}

class UserDatabase extends FunctionalDatabase {
    #database

    constructor(database) {
        super(database)
    }

    searchByName(username) {
        const searchedUser = this.searchByKey('username', username)

        return searchedUser
    }

    addUser(id, user) {
        if (user.username.length < 6) {
            throw new Error('Username must be 6 characters long')
        }

        const userExists = this.searchByName(user.username)
        const idInUse = this.searchById(id)

        if (userExists) {
            throw new Error('Usernames must be unique')
        }

        if (idInUse) {
            throw new Error('Id already in use')
        }

        const newUser = { ...user, id: id }

        this.addItem(newUser)

        return newUser
    }

    removeUser(id) {
        this.removeItem(id)
        return this.viewDatabase()
    }

    updateUser(id, user) {
        if (user.username.length < 6) {
            throw new Error('Username must be 6 characters long')
        }

        const usernameInUse = this.searchByName(user.username)

        if (usernameInUse && usernameInUse.id !== id) {
            throw new Error('Usernames must be unique')
        }

        this.updateItem(id, user)

        return this.viewDatabase()
    }
}

class PostDatabase extends FunctionalDatabase {
    constructor(database) {
        super(database)
    }

    searchByTitle(title) {
        const searchedPost = this.searchByKey('title', title)

        return searchedPost
    }

    addPost(id, post) {
        if (post.title.split(' ').length < 5) {
            throw new Error('title must be 5 words long')
        }

        if (post.content.split(' ').length < 10) {
            throw new Error('content must be 10 words long')
        }

        const idInUse = this.searchById(id)

        if (idInUse) {
            throw new Error('Id already in use')
        }

        const newpost = { ...post, id: id }

        this.addItem(newpost)

        return newpost
    }

    removePost(id) {
        this.removeItem(id)
        return this.viewDatabase()
    }

    updatePost(id, post) {
        if (post.title.split(' ').length < 4) {
            throw new Error('title must be 5 words long')
        }

        if (post.content.split(' ').length < 9) {
            throw new Error('content must be 10 words long')
        }

        this.updateItem(id, post)

        return this.viewDatabase()
    }
}

class DatabaseFactory {
    create(DatabaseType) {
        return new DatabaseType(new Database())
    }
}

class IdCreator {
    create() {
        const id = (Date.now() * Math.random()).toFixed(0)

        return id
    }
}

export { DatabaseFactory, UserDatabase, PostDatabase, IdCreator }
