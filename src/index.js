class User {
    constructor(id, username, password) {
        this.id = id
        this.username = username
        this.password = password
    }
}

class Post {
    constructor(id, title, content) {
        this.id = id
        this.title = title
        this.content = content
    }
}

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
        return [...this.#entries]
    }
}

class UserDatabase {
    #database
    constructor(database = new Database()) {
        this.#database = database
        this.id = 1
    }

    addUser(username, password) {
        const newUser = new User(this.id, username, password)
        if (
            typeof username === 'string' &&
            username.length >= 6 &&
            !this.findUserName(username)
        ) {
            this.id++
            this.#database.add(newUser)
        } else throw 'Invalid username, must be at least 6 characters long'
    }

    findUserName(username) {
        const entries = this.#database.entries
        const found = entries.find((d) => d.username === username)
        return found
    }

    findUserByID(id) {
        const found = this.#database.findByID(id)
        return found
    }

    removeUser(id) {
        const remove = this.#database.remove(id)
        return remove
    }

    get database() {
        return this.#database.entries
    }
}

class PostDatabase {
    #database
    constructor(database = new Database()) {
        this.#database = database
        this.id = 1
    }

    addPost(title, content) {
        const newPost = new Post(this.id, title, content)
        let titleWords = title.split(' ')
        let contentWords = content.split(' ')
        if (
            typeof title === 'string' &&
            titleWords.length >= 5 &&
            contentWords.length >= 10
        ) {
            this.id++
            this.#database.add(newPost)
        } else 
        throw 'Invalid post, please ensure title is min 5 words & content is min 10 words'
    }

    removePost(id) {
        const newPosts = this.#database.remove(id)
        return newPosts
    }

    findPost(id) {
        const found = this.#database.findByID(id)
        return found
    }

    get database() {
        return this.#database.entries
    }
}
export { UserDatabase, PostDatabase, User, Post }
export default Database

const data = new Database()
const userDatabase = new UserDatabase()
userDatabase.addUser('billybob', 'newpassword')

const postDatabase = new PostDatabase()
postDatabase.addPost('First Post on the site', 'So excited to try this new social media today wow')

userDatabase.findUserByID(1)


