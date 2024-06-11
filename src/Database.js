export default class Database {
    #data

    constructor() {
        this.#data = []
    }

    isObject(item) {
        return typeof item === 'object' && item !== null
    }

    isNumber(item) {
        return typeof item.id === 'number'
    }

    add(item) {
        if (!this.isObject(item) || !this.isNumber(item)) {
            throw new Error('Invalid item')
        }

        this.#data.push(item)
    }

    remove(id) {
        const index = this.#data.findIndex(i => i.id === id)
        if (index === -1) {
            throw new Error('Item not found')
        }
        this.#data.splice(index, 1)
    }

    findById(id) {
        const item = this.#data.find(i => i.id === id)
        if (!item) {
            throw new Error('Item not found')
        }
        return item
    }

    update(id, item) {
        const index = this.#data.findIndex(i => i.id === id)
        if (index === -1) {
            throw new Error('Item not found')
        }
        this.#data[index] = { ...this.#data[index], ...item }
    }

    findBy(key, value) {
        return this.#data.find(item => item[key] === value)
    }
}
