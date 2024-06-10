class Database {
    #database

    constructor(database = []) {
        this.#database = database
    }

    get database() {
        return [...database]
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
    }

    updateItem(item) {
        const foundItem = this.searchById(id)

        if(!foundItem) {
                throw new Error('An item does not exist with this ID, if you wish to add a new item use the addItem method.')
        }

        foundItem = { ...item }
    }
}

class FunctionalDatabase {
    #database

    constructor(database) {
        this.#database = database
    }
}

class UserDatabase extends FunctionalDatabase {
    constructor(database) {
        super(database)
    }

    searchByName(username) {
        const searchedUser = this.database.find((element) => {
            element.username === username
        })
    }

    addUser(id, user) {
        if(user.username.length < 6) {
            throw new Error('Username must be 6 characters long')
        }
        
        const userExists = this.searchByName(user.username)
        const idInUse = this.database.searchById(id)

        if(userExists) {
            throw new Error('Usernames must be unique')
        }

        if(idInUse) {
            throw new Error('Id already in use')
        }

        const newUser = {...user,id:id}

        this.database.addItem(newUser)

        return newUser

    }

    removeUser(id) {
        this.database.removeItem(id)
    }

    viewDatabase() {
        return this.database.database
    }
}

class PostDatabase extends FunctionalDatabase {
    constructor(database) {
        super(database)
    }
}

class DatabaseFactory {
    create(DatabaseType) {
        return new DatabaseType(new Database)
    }
}

class idCreator {
    create() {
        return Date.now() * Math.random().toFixed(0)
    }
}
