import { ConsoleReporter } from "jasmine"

class Database {
  #myDatastore
  #id
  constructor() {
    this.#myDatastore = []
    this.#id = 1
  }

  add(name) {
    const myObject = {
      id : this.#id,
      name : name
    }
    this.#myDatastore.push(myObject)
    this.#id++
  }

  findById (id) {
    const index = this.#myDatastore.findIndex((item) => {
      return item.id === id
    })
    if(index === -1) {
      console.log(`Could not find userId with : ${id} in database!`)
    } else {
      return index
    }
  }

  remove(id) {
    const found = this.findById(id)

    if(found === -1) {
      console.log('The user do not exist!')
    } else {
      this.#myDatastore.splice(found, 1)
      console.log(`user with id ${id} has been deleted!`)
    }

  }

  update(id, newName) {
    const index = this.findById(id)
    const oldName = this.#myDatastore[index].name
    if(index === -1) {
      console.log('Could not find the user!')
    } else {
      this.#myDatastore[index].name = newName
      return console.log(`user ${oldName} changed to ${newName}!`)
    }
  }

  get myDatabase() {
    return this.#myDatastore
  }
}

export { Database }