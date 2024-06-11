export class Database {
  #id;
  #data;
  constructor() {
    this.#id = 0;
    this.#data = [];
  }

  getData() {
    return structuredClone(this.#data);
  }

  add(data) {
    if (typeof data !== "object") throw new Error(`wrong data type provided`);

    this.#id++;
    data.id = this.#id;
    this.#data.push(data);
  }

  remove(id) {
    this.#data = this.#data.filter((obj) => obj.id !== this.find(id).id);
  }

  update(object, key, newValue) {
    object[key] = newValue;
    return object;
  }

  find(id) {
    const result = this.#data.find((obj) => obj.id === id);
    if (!result) throw new Error(`data with ID ${id} is not found`);
    return result;
  }
}

export class UserDatabase {
  constructor(data) {
    this.data = data;
  }

  add(data) {
    this.checkUsernameValidation(data);
    this.data.add(data);
  }

  remove(id) {
    this.data.remove(id);
  }

  update(id, key, newVlaue) {
    const objToUpdate = this.find(id);

    if (key in objToUpdate === false)
      throw new Error(`'${key}' field does not exist`);

    if (key === "id" || key === "userName")
      throw new Error(`this field can not be changed`);

    this.data.update(objToUpdate, key, newVlaue);
  }

  getUsers() {
    return this.data.getData();
  }

  find(id) {
    return this.data.find(id);
  }

  checkUsernameValidation(data) {
    const isItString = typeof data.userName === "string";
    const has6CharsOrMore = data.userName.length >= 6;
    const isNotExisted =
      this.getUsers().find((obj) => obj.userName === data.userName) ===
      undefined;

    if (!isItString) throw new Error(`the username should be a string`);
    if (!has6CharsOrMore)
      throw new Error(`the username should be at least 6 characters long`);
    if (!isNotExisted) throw new Error(`this username is already existed`);
  }
}

export class User {
  constructor(firstName, lastName, age, userName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.userName = userName;
  }
}

export class PostDatabase {
  constructor(data) {
    this.data = data;
  }

  add(data) {
    this.addPostValidation(data);

    this.data.add(data);
  }

  remove(id) {
    this.data.remove(id);
  }

  update(id, key, newValue) {
    const objToUpdate = this.find(id);
    this.updatePostValidation(id, key, newValue, objToUpdate);
    this.data.update(objToUpdate, key, newValue);
  }

  getPosts() {
    return this.data.getData();
  }

  find(id) {
    return this.data.find(id);
  }

  addPostValidation(data) {
    const isItString = typeof data.title === "string";
    const has5CharsOrMore = data.title.length >= 5;
    const isContent10WordsOrMore = data.content.split(" ").length >= 10;

    if (!isItString) throw new Error(`the post's title should be a string`);
    if (!has5CharsOrMore)
      throw new Error(`the post's title should be at least 5 characters long`);
    if (!isContent10WordsOrMore)
      throw new Error(`this post's content should have at least 10 words`);
  }

  updatePostValidation(id, key, newValue, objToUpdate) {
    if (key in objToUpdate === false)
      throw new Error(`'${key}' field does not exist`);

    if (key === "id") throw new Error(`this field can not be changed`);

    if (key === "title" && typeof newValue !== "string")
      throw new Error(`the post's title should be a string`);

    if (key === "title" && newValue.length < 5)
      throw new Error(`the post's title should be at least 5 characters long`);

    if (key === "content" && newValue.split(" ").length < 10)
      throw new Error(`this post's content should have at least 10 words`);
  }
}

export class Post {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
}

const user = new UserDatabase(new Database());

user.add(new User("Hany", "Nany", 35, "bbbbbb"));

user.add(new User("Samiy", "Perdo", 35, "bbbbbbb"));

const post = new PostDatabase(new Database());
post.add(
  new Post("hiiii", "I think that now it is working, we have to learn more ")
);
post.add(
  new Post(
    "havascript",
    "I like it, it is a very powerful language and so popular"
  )
);

post.add(
  new Post(
    "c# language",
    "I don't know anything about it, but I heard that it is not that easy"
  )
);
