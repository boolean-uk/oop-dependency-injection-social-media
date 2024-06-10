class Database {
    #data

    constructor(data) {
        this.#data = data
    }

    getData() {
        return [...this.#data]
    }

    findById(id) {
        return this.#data.find((object) => object.id = id)
    }
}

export default Database