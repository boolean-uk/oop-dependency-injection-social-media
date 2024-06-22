export default class Database {
  rows = [];
  id;
  constructor(input = []) {
    this.rows = input;
    this.id = 1;
  }

  add(data) {
    let insert = { ...data, id: this.id };
    this.rows.push(insert);
    this.id++;
    return insert;
  }

  remove(id) {
    let updatedRows = this.rows.filter((row) => row.id !== id);
    this.rows = updatedRows;
    return this.rows;
  }

  findById(id) {
    let found = this.rows.find((row) => row.id === id);
    return found;
  }

  update(id, data) {
    let found = this.findById(id);
    found = { ...found, ...data };
    return found;
  }

  list(){
    return this.rows
  }
}

export class UserDatabase {
  #users;
  constructor(database) {
    this.#users = database;
  }

  add(user) {
    if (user.username.length <= 6)
      throw "username must have minimum 6 characters";

    let found = this.#users.find((usr) => usr.username === user.username);
    if (found) throw "username must be unique";

    return this.#users.add(user);
  }
  remove(id) {
    return this.#users.remove(id);
  }
  findById(id) {
    return this.#users.findById(id);
  }
  update(id, user) {
    if (user.username.length <= 6)
      throw "username must have minimum 6 characters";

    let found = this.#users.find((usr) => usr.username === user.username);
    if (found) throw "username must be unique";

    return this.#users.update(id, user);
  }
}

export class PostDatabase {
  #posts;
  constructor(database) {
    this.#posts = database;
  }

  add(post) {
    if (post.title.split(" ").length < 5)
      throw "post title must have minimum 5 words";

    if (post.content.split(" ").length < 6)
      throw "content must have minimum 6 words";

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
