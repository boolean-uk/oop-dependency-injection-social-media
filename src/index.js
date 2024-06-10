class DataBase {
    #array
    #idCount
    constructor(array) {
        this.#array = array
        this.#idCount = 10
    }
    getData() {
        return [...this.#array]
    }
    add(object) {
        object.id = this.#idCount
        this.#idCount++
        this.#array.push(object)
    }
    remove(id) {
        let objectIndex
        this.#array.forEach((object, index) => {
            if (object.id === id) {
                objectIndex = index
            }
        })
        if (objectIndex === undefined) {
            throw "id not found"
        }
        this.#array.splice(objectIndex, 1)
    }
    findById(id) {
        let response
        this.#array.forEach((object) => {
            if (object.id === id) {
                response = object
            }
        })
        if (response === undefined) {
            throw "id not found"
        }
        return {...response}
    }
    update(id, object) {
        let objectIndex
        this.#array.forEach((object, index) => {
            if (object.id === id) {
                objectIndex = index
            }
        })
        if (objectIndex === undefined) {
            throw "No object with this id"
        }
        this.#array.splice(objectIndex, 1, object)
    }
}

class UserDataBase {
    #dataBase
    constructor(dataBase) {
        this.#dataBase = dataBase
    }
}

class PostDataBase {
    #dataBase
    constructor(dataBase) {
        this.#dataBase = dataBase
    }
}

export default DataBase
export { UserDataBase, PostDataBase }