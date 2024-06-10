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
        const foundItem = this.searchById(id)

        if (!foundItem) {
            throw new Error(
                'An item does not exist with this ID, if you wish to add a new item use the addItem method.'
            )
        }

        foundItem = { ...item }
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
}

class PostDatabase extends FunctionalDatabase {
    constructor(database) {
        super(database)
    }
}

class DatabaseFactory {
    create(DatabaseType) {
        return new DatabaseType(new Database())
    }
}

class IdCreator {
    create() {
        return Date.now() * Math.random().toFixed(0)
    }
}

export { DatabaseFactory, UserDatabase, PostDatabase, IdCreator }
