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
}


export default Database
export { UserDatabase }
