class Database {
  #myDatastore
  #id
  constructor() {
    this.#myDatastore = []
    this.#id = 1
  }

  add(value) {
    const myObject = {
      id : this.#id,
      value : value
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
      console.log(`user ${index} founded!`)
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

  update(id, newValue) {
    const index = this.findById(id)
    const oldValue = this.#myDatastore[index].value
    if(index === -1) {
      console.log('Could not find the user!')
    } else {
      this.#myDatastore[index].value = newValue
      return console.log(`user ${oldValue} changed to ${newValue}!`)
    }
  }

  get myDatabase() {
    return this.#myDatastore
  }
}

export { Database }

const mydata = new Database()

mydata.add('farshad')
mydata.add('will')
mydata.add('nathan')
mydata.remove(3)
mydata.add()
mydata.findById(11)
mydata.update(4, 'Azam')
mydata.add('shahi')
mydata.update(5, 'shaian')
console.log(mydata.myDatabase)