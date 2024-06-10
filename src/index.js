class Database {
    #entries
    constructor() {
        this.#entries = []
    }

    add(data) {
        if(typeof data === 'object' && typeof data.id === 'number') {
            this.#entries.push(data)
        } else {
            throw `Invalid data type`
        }
    }

    findByID(id) {
        const found = this.#entries.find((d) => d.id === id)

        if(!found) {
            throw 'Invalid ID'
        }
        return found
    }

    remove(id) {
        let found = this.findByID(id)
        if(!found) {
            throw 'Unable to remove please data exists'
        }
        const index = this.#entries.indexOf(found)
        const updated = this.#entries.splice(index, 1)
        return updated
    }

    get entries() {
        console.log(this.#entries)
        return [...this.#entries]
    }
}

class UserDatabase extends Database{
    constructor(username) {
        super()
        this.username = username
        this.id = 1
    }

    addUser(username) {
        if(typeof username === 'string' && username.length >= 6 && !this.findUserName(username)) {
            this.id++
            super.add(user)
        } else throw 'Invalid username, must be at least 6 characters long'
    }

    findUserName(username) {
        const found = this.entries((user) => user.username === username)
        return found
    }

    findUserByID(id) {
        super.findByID(id)
    }

    removeUser(id) {
        super.remove(id)
    }
}

const data = new Database()
data.add({id: 1, post: 'Hello there'})
// data.add({id: 1, post: 'checking in'})

const newUser = new UserDatabase()
newUser.addUser('billybob')
data.entries


