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
}


export default Database
