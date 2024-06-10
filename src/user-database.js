import { Database } from "./database.js";

class UserDatabase {
  constructor () {
    this.userData = new Database()
  }

  add(name) {
    const founded = this.findByName(name)
    const length = this.userRules(name)
    if(founded === true || length === false){
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
    if(name.length > 6) return true
    else {
      console.log(`${name} is less than 6 characters!`)
      return false
    }
  }

  findByName(value) {
    const database = this.userDataBase
    const exist = database.find((item) => {
      return item.value === value
    })
    if(exist === undefined) {
      return `${value} is not exist!`
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



const mydata = new UserDatabase()


mydata.add('farshad')
mydata.add('will')
mydata.add('farshad')
mydata.add('nathan')
// mydata.removeById(3)
mydata.add('Peric')
mydata.updateById(4, 'Angus')
// mydata.add('shahi')
// mydata.update(5, 'shaian')
console.log(mydata.userDataBase)
// console.log(mydata.findByName('farshad'))

// console.log(mydata.userRules('farshad'))