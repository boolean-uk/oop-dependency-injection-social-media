import Database from "./Database.js";

class UserDatabase {
  #database;

  constructor(database) {
    this.#database = database;
  }

  getData() {
    return this.#database.getData();
  }

  findById(id) {
    return this.#database.findById(id);
  }

  addData(username, email) {
    const foundData = this.getData().find((element) => element.username === username)
      if (!(username.length > 6) || foundData) {
          throw new Error("Usernames must be unique and over 5 characters");
        }
    this.#database.addData('username', username, 'email', email)
  }

  updateById(id, key, value) {
    if (key === "username") {
        const foundData = this.getData().find((element) => element.username === value)
      if (!(value.length > 6) || foundData) {
          throw new Error("Usernames must be unique and over 5 characters");
        }
    }
    return this.#database.updateById(id, key, value);
  }

  removeById(id) {
    return this.#database.removeById(id);
  }
}

export default UserDatabase;
