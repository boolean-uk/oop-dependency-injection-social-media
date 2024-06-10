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
}


export default Database
