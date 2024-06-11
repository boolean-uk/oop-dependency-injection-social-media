import Database from './Database.js'

export default class PostDatabase {
    #database

    constructor(database = new Database()) {
        this.#database = database
    }

    #validatePost(post) {
        const { title, content } = post
        if (typeof title !== 'string' || title.split(' ').length < 6) {
            throw new Error('Invalid title')
        }
        if (typeof content !== 'string' || content.split(' ').length < 11) {
            throw new Error('Invalid content')
        }
    }
    
    add(post) {
        this.#validatePost(post)
        this.#database.add(post)
    }

    remove(id) {
        this.#database.remove(id)
    }

    findById(id) {
        return this.#database.findById(id)
    }

    update(id, post) {
        this.#validatePost(post)
        this.#database.update(id, post)
    }
}
