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
    
    if(index===-1 || index === undefined) {
      return undefined
    } else {
      return index
    }
  }

  remove(id) {
    const found = this.findById(id)
    if(found === -1 || found === undefined) {
      console.log('The user do not exist!')
    } else {
      this.#myDatastore.splice(found, 1)
    }

  }

  update(id, newData) {
    const index = this.findById(id)
    
    if(index === -1 || index === undefined) {
      return console.log('Could not find the user!')
    } else {
      this.#myDatastore[index].name = newData
    }
  }

  get myDatabase() {
    return this.#myDatastore
  }
}

export { Database }