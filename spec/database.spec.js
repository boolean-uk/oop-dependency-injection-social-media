import { users, posts } from "../src/dummydata.js";
import Database from "../src/Database.js";
import UserDatabase from "../src/UserDatabase.js";
import PostDatabase from "../src/PostDatabase.js";

describe("Database", () => {
  let myDatabase;

  beforeEach(() => {
    myDatabase = new Database([...users]);
  });

  it("should construct with data and return the data with a getData method", () => {
    expect(myDatabase.getData()).toEqual(users);
  });

  it("should find a data object by its ID", () => {
    expect(myDatabase.findById(5)).toEqual({
      id: 5,
      username: "bob_builder",
      email: "bobbuilder@example.com",
    });
  });

  it("should update data after finding it by ID", () => {
    myDatabase.updateById(1, "username", "Mr_Pistachio");

    expect(myDatabase.findById(1).username).toEqual("Mr_Pistachio");
  });

  it("should remove data by ID", () => {
    myDatabase.removeById(1);

    expect(() => {
      myDatabase.findById(1);
    }).toThrowError("No data found with this ID");
  });
});

describe("UserDatabase", () => {
  let myUserDatabase;

  beforeEach(() => {
    myUserDatabase = new UserDatabase(new Database([...users]));
  });

  it("should have the same detData method as injected database", () => {
    expect(myUserDatabase.getData()).toEqual([...users]);
  });

  it("should have the same getById method as injected database", () => {
    expect(myUserDatabase.findById(5)).toEqual({
      id: 5,
      username: "bob_builder",
      email: "bobbuilder@example.com",
    });
  });

  it("should have the same update method as injected database", () => {
    myUserDatabase.updateById(8, "username", "Shane-o");

    expect(myUserDatabase.findById(8).username).toEqual("Shane-o");
  });

  it("should have the same removeDataById method as injected database", () => {
    myUserDatabase.removeById(1);

    expect(() => {
      myUserDatabase.findById(1);
    }).toThrowError("No data found with this ID");
  });

  it("should throw an error when trying to update username with a string of less than 5 characters", () => {
    expect(() => {
      myUserDatabase.updateById(1, "username", "four");
    }).toThrowError("Usernames must be unique and over 5 characters");
  });

  it("should throw an error when trying to update username with a non-unique username", () => {
    expect(() => {
      myUserDatabase.updateById(1, "username", "franklin_jr");
    }).toThrowError("Usernames must be unique and over 5 characters");
  });
});

describe("PostrDatabase", () => {
  let myPostDatabase;

  beforeEach(() => {
    myPostDatabase = new PostDatabase(new Database([...posts]));
  });

  it("should have the same detData method as injected database", () => {
    expect(myPostDatabase.getData()).toEqual([...posts]);
  });

  it("should have the same getById method as injected database", () => {
    expect(myPostDatabase.findById(5)).toEqual({
      id: 5,
      title: "An Introduction to JavaScript ES6 Features",
      content:
        "ES6 brought many new features to JavaScript, such as arrow functions, let and const, template literals, and destructuring. These features make the language more powerful and expressive, allowing for cleaner and more concise code.",
    });
  });

  it("should have the same update method as injected database", () => {
      myPostDatabase.updateById(8, "title", "Why fortran is the most whimsical language");

    expect(myPostDatabase.findById(8).title).toEqual("Why fortran is the most whimsical language");
  });

  it("should have the same removeDataById method as injected database", () => {
    myPostDatabase.removeById(1);

    expect(() => {
      myPostDatabase.findById(1);
    }).toThrowError("No data found with this ID");
  });

  it("should throw an error when trying to update a title with a string of less than 5 words", () => {
    expect(() => {
      myPostDatabase.updateById(1, "title", "this won't work");
    }).toThrowError("Post titles must be more than 5 words");
  });

  it("should be able to have new data added", () => {
    myPostDatabase.addData('Why C++ is the worst thing sliced cheese', 'I have no idea. In fact, I have no idea what is going on')

    const foundPost = myPostDatabase.getData().find((posts) => posts.title === 'Why C++ is the worst thing sliced cheese')
    expect(foundPost.title).toEqual('Why C++ is the worst thing sliced cheese')

  })
});
