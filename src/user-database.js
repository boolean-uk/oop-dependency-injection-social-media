import { Database } from "./database.js";

class UserDatabase {
  constructor () {
    this.storeData = new Database()
  }
}


const user = new UserDatabase()
console.log(user)