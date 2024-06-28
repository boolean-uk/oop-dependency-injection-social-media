const info = [
  {
    id: 1,
    username: "samisaeed",
    numOfPosts: 3,
  },
];
const newInfo = [
  {
    id: 2,
    username: "zema",
    numOfPosts: 18,
  },
];

class Database {
  constructor(data = [], numOneData = [...info], numTwoData = [...newInfo]) {
    this.data = data;
    this.numOneData = numOneData;
    this.numTwoData = numTwoData;
  }

  addData() {
    this.numOneData.push(...this.numTwoData);
  }

  checkId() {
    const results = [];
    for (let i = 0; i < this.numOneData.length; i++) {
      if ("id" in this.numOneData[i]) {
        results.push(`Index at ${i} has an id property`);
      } else {
        results.push(`Index at ${i} does not have an id property`);
      }
    }
    return results;
  }

  removeData() {
    this.numOneData.pop();
  }

  findDataById(id) {
    return this.numOneData.find((item) => item.id === id);
  }
}

class UserDatabase {
  constructor(database) {
    this.database = database;
  }

  validateUsername(username) {
    if (typeof username !== "string" || username.length < 6) {
      throw new Error(
        "Username must be a string no less than 6 characters long"
      );
    }
  }

  addUser(user) {
    this.validateUsername(user.username);
    if (this.database.numOneData.some((u) => u.username === user.username)) {
      throw new Error("Username must be unique");
    }
    this.database.numOneData.push(user);
  }

  removeUserData() {
    this.database.removeData();
  }

  findUserById(id) {
    return this.database.findDataById(id);
  }

  checkUserId() {
    return this.database.checkId();
  }
}

class PostDatabase {
  constructor(database) {
    this.database = database;
  }

  validatePost(title, content) {
    if (typeof title !== "string" || title.split(" ").length < 5) {
      throw new Error("Title must be a string no less than 5 words long");
    }
    if (typeof content !== "string" || content.split(" ").length < 10) {
      throw new Error("Content must be no less than 10 words long");
    }
  }

  addPost(post) {
    this.validatePost(post.title, post.content);
    this.database.numOneData.push(post);
  }

  removePostData() {
    this.database.removeData();
  }

  findPostById(id) {
    return this.database.findDataById(id);
  }

  checkPostId() {
    return this.database.checkId();
  }
}

module.exports = { UserDatabase, PostDatabase, Database };
