import Database from "./Database.js"

class UserDatabase{
    #database

    constructor(database) {
        this.#database = database
    }

    getData() {
        return this.#database.getData()
    }

    findById(id) {
        return this.#database.findById(id)
    }

    updateById(id, key, value) {
        return this.#database.updateById(id, key, value)
    }
}

export default UserDatabase



// findById(id) {
//     const foundData = this.#data.find((object) => object.id === id);
//     if (!foundData) {
//       throw new Error("No data found with this ID");
//     }
//     return foundData;
//   }

//   updateById(id, key, value) {
//     const entryToUpdate = this.findById(id);
//     entryToUpdate[key] = value;

//     return {...entryToUpdate};
//   }

//   removeById(id) {
//     const entryToRemove = this.findById(id);
//     const index = this.#data.indexOf(entryToRemove);
//     this.#data.splice(index, 1);

//     return {...entryToRemove};
//   }