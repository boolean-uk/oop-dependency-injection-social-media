export default class Database {
    #rows = [];
    #id;
    constructor(input = []) {
      this.#rows = input;
      this.#id = 1;
    }
  
    add(row) {
      let insert = { ...row, id: this.#id };
      this.#rows.push(insert);
      this.#id++;
      return this.#rows;
    }
  
    remove(id) {
      let updatedRows = this.#rows.filter((row) => row.id !== id);
      this.#rows = updatedRows;
      return this.#rows;
    }
  
    findById(id) {
      let found = this.#rows.find((row) => row.id === id);
      return found;
    }
  
    update(id, data) {
      let found = this.findById(id);
      found = { ...found, ...data };
      return found;
    }
  }
  
  export class UserDatabase {
    #users;
    constructor(database) {
      this.#users = database;
    }
  
    add(user) {
      return this.#users.add(user);
    }
    remove(id) {
      return this.#users.remove(id);
    }
    findById(id) {
      return this.#users.findById(id);
    }
    update(id, user) {
      return this.#users.update(id, user);
    }
  }
  
  export class PostDatabase {
    #posts;
    constructor(database) {
      this.#posts = database;
    }
  
    add(data) {
      return this.#posts.add(data);
    }
    remove(id) {
      return this.#posts.remove(id);
    }
    findById(id) {
      return this.#posts.findById(id);
    }
    update(id, data) {
      return this.#posts.update(id, data);
    }
  }
  