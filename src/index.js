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
    }
}


export default Database
