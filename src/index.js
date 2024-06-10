class Database {
    #allData
    #idCounter

    constructor() {
        this.#allData = []
        this.#idCounter = 1
    }

    get data() {
        return [...this.#allData]
    }

    addData(data) {
        data.id = this.#idCounter
        this.#allData.push(data)
        this.#idCounter++
    }
}

export default Database
