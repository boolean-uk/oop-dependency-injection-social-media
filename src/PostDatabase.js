import Database from "./Database.js";

class PostDatabase {
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

  addData(title, content) {
    this.#database.addData('title', title, 'content', content)
  }

  updateById(id, key, value) {
    if (key === "title" && value.split(" ").length <= 4) {
      throw new Error("Post titles must be more than 5 words")
    }
    return this.#database.updateById(id, key, value);
  }

  removeById(id) {
    return this.#database.removeById(id);
  }
}

export default PostDatabase;