class Database {
    #allData
    #idCounter

    constructor() {
        this.#allData = new Map()
        this.#idCounter = 1
    }

    get data() {
        return structuredClone(this.#allData)
    }

    addData(data) {
        if (typeof data !== 'object' || data === null) {
            throw 'data must be an object'
        }

        data.id = this.#idCounter
        this.#allData.set(this.#idCounter, data)
        this.#idCounter++
    }

    findById(id) {
        const foundData = this.#allData.get(id)

        if(!foundData) {
            throw 'data not found'
        }

        return foundData
    }

    removeData(id) {
        const foundData = this.findById(id)

        this.#allData.delete(id)

        return foundData
    }

    updateData(id, newData) {
        const foundData = this.findById(id)

        newData.id = foundData.id

        this.#allData.set(id, newData)

        return this.#allData.get(id)
    }
}

class UserDatabase {
    #data

    constructor(data) {
        this.#data = data
    }

    get userData() {
        return structuredClone(this.#data.data)
    }

    addData(data) {
        if (typeof data !== 'object' || data === null) {
            throw 'data must be an object'
        }

        this.checkValidData(data)

        this.#data.addData(data)
    }

    findById(id) {
       return this.#data.findById(id)
    }

    removeData(id) {
        return this.#data.removeData(id)
    }

    updateData(id, newData) {
        return this.#data.updateData(id, newData)
    }

    checkValidData(data) {
        let foundUserName = null

        for(const [key, value] of this.#data.data) {
            if(value.username.includes(data.username)) {
                foundUserName = key
            }
        }

        if (!data.username || data.username.length < 6 || foundUserName) {
            throw 'data must have a unique username of no less than 6 characters long'
        }
    }
}

class PostDatabase {
    #data

    constructor(data) {
        this.#data = data
    }

    get postData() {
        return structuredClone(this.#data.data)
    }

    addData(data) {
        if (typeof data !== 'object' || data === null) {
            throw 'data must be an object'
        }

        this.checkValidData(data)

        this.#data.addData(data)
    }

    findById(id) {
       return this.#data.findById(id)
    }

    removeData(id) {
        return this.#data.removeData(id)
    }

    updateData(id, newData) {
        this.checkValidData(newData)

        return this.#data.updateData(id, newData)
    }

    checkValidData(data) {
        function countWords(string) {
            return string.split(' ').length
        }

        if(!data.title || countWords(data.title) < 5 || !data.content || countWords(data.content) < 10) {
            throw 'post must have a title of no less than 5 words long and a content of no less tham 10 words long'
        }
    }
}


export default Database
export { UserDatabase, PostDatabase }
