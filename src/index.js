class Database {
    #allData

    constructor() {
        this.#allData = []
    }

    get data() {
        return [...this.#allData]
    }

    addData(data) {
        if (typeof data !== 'object' || data === null) {
            throw 'data must be an object'
        }

        if(!data.id) {
            throw 'data must have an id'
        }

        this.#allData.push(data)
    }

    findById(id) {
        const foundData = this.#allData.find((data) => data.id === id)

        if(!foundData) {
            throw 'data not found'
        }

        return foundData
    }

    removeData(id) {
        const foundData = this.findById(id)
        const foundDataIndex = this.#allData.indexOf(foundData)

        this.#allData.splice(foundDataIndex, 1)

        return foundData
    }

    updateData(id, newData) {
        const foundData = this.findById(id)
        const foundDataIndex = this.#allData.indexOf(foundData)

        this.#allData.splice(foundDataIndex, 1, newData)

        return this.#allData[foundDataIndex]
    }
}

class UserDatabase {
    #data

    constructor(data) {
        this.#data = data
    }

    get userData() {
        return [...this.#data.data]
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
        const foundUserName = this.#data.data.find((d) => d.username === data.username)

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
        return [...this.#data.data]
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
