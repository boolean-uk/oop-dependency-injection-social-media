class Database {
    #data

    constructor() {
        this.#data = []
        this.id = 0
    }

    get data() {
        return this.#data
    }

    add(...props) {
        this.id += 1
        this.#data.push([this.id, ...props])
        return this.data
    }

    remove(prop) {
        const dataToRemove = this.#data.findIndex((d) => {
            return d.includes(prop)
        })
        
        if (dataToRemove === -1) {
            throw new Error('Data not found')
        }

        this.#data.splice(dataToRemove, 1)
        return this.data
    }

    find(id) {
        const filteredData = this.#data.find((d) => {
            return d[0] === id
        })

        if (!filteredData) {
            throw new Error('Data not found')
        }

        return filteredData
    }

    update(prop) {
        const dataToUpdate = this.#data.find((d) => {
            return d.includes(prop)
        })

        if (!dataToUpdate) {
            throw new Error('Data not found')
        }

        dataToUpdate[prop] = prop
        return dataToUpdate
    }
}

class UserDatabase {
    #data

    constructor(database) {
        this.#data = database
    }

    get data() {
        return this.#data
    }
}

class PostDatabase {
    #data

    constructor(database) {
        this.#data = database
    }

    get data() {
        return this.#data
    }
}

export { 
    UserDatabase, 
    PostDatabase 
}
export default Database
