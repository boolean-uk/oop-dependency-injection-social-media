import { Database } from "./database.js";

class UserDatabase {
  constructor () {
    this.userData = new Database()
  }

  add(name) {
    const founded = this.findByName(name)
    const rules = this.userRules(name)
    if(founded === true || rules === false){
      return 0
    } else this.userData.add(name)
  }

  get userDataBase() {
    return this.userData.myDatabase
  }

  findById(id) {
    return this.userData.findById(id)
  }

  userRules(name) {
    if(name.length > 5 && typeof name !== 'number') return true
    else {
      console.log(`${name} is less than 6 characters!`)
      return false
    }
  }

  findByName(name) {
    const database = this.userDataBase
    const exist = database.find((item) => {
      return item.name === name
    })
    if(exist === undefined) {
      return `${name} is not exist!`
    } else return true
  }

  removeById(id) {
    return this.userData.remove(id)
  }

  updateById(id, newName) {
    const length = this.userRules(newName)
    const founded = this.findByName(newName)
    if(founded === true || length === false){
      return 0
    } else return this.userData.update(id, newName)
  }
}


export { UserDatabase }