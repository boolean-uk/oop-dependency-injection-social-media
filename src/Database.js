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

    updateById(id, key, value) {
        const entryToUpdate = this.findById(id)
        entryToUpdate[key] = value
    }
}

export default Database