import Database from './Database.js'

export default class UserDatabase {
    #database

    constructor(database = new Database()) {
        this.#database = database
    }

    #validateUser(user) {
        if (!user.username || user.username.length < 6) {
            throw new Error('Invalid user')
        }

        const found = this.#database.findBy('username', user.username)

        if (found) {
            throw new Error('Username must be unique')
        }
    }

    add(user) {
        this.#validateUser(user)
        this.#database.add(user)
    }

    remove(id) {
        this.#database.remove(id)
    }

    findById(id) {
        return this.#database.findById(id)
    }

    update(id, user) {
        const existingUser = this.#database.findById(id)
        if (existingUser.username !== user.username) {
            this.#validateUser(user)
        }
        this.#database.update(id, user)
    }
}
