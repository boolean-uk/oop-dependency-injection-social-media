class Database {
    constructor(data =[]) {
        this.data = data
    }

    add(item) {
        if(this.data.find(el => el.id === item.id)) {
            throw new Error('Item with this ID already exists')
        }
        this.data.push(item)
    }

    remove(id) {
        const index = this.data.findIndex(el => el.id === id)
        if ( index !== -1) {
            this.data.splice(index, 1)
        } else {
            throw new Error ('Item not found')
        }
    }

    findByID(id) {
        return this.data.find(el => el.id === id) || null
    }

    update(id, updatedItem) {
        const index = this.data.findIndex(el => el.id === id)
        if (index !== -1) {
            this.data[index] = updatedItem
        } else {
            throw new Error ('Item not found')
        }
    }
}

export { Database }