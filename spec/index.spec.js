import { Database, PostDatabase, UserDatabase } from "../src/index.cjs";

describe("Database", () => {
  let test;

  beforeEach(() => {
    test = new Database();
  });

  it("should add data to the array", function () {
    test.addData();
    expect(test.numOneData.length).toEqual(2);
  });

  it("should check that each index has an id", function () {
    const results = test.checkId();
    expect(results[0]).toEqual("Index at 0 has an id property");
  });

  it("should remove data within the array", function () {
    test.addData();
    test.removeData();
    expect(test.numOneData.length).toEqual(1);
  });

  it("should find the object with id 1", () => {
    const result = test.findDataById(1);
    test.addData();
    expect(result).toEqual({ id: 1, username: "samisaeed", numOfPosts: 3 });
  });
});
describe("UserDatabase", () => {
  let userDb;

  beforeEach(() => {
    userDb = new UserDatabase();
  });

  it("should throw an error if username is less than 6 characters", () => {
    expect(() =>
      userDb.addUser({ id: 3, username: "short", numOfPosts: 5 })
    ).toThrowError("Username must be a string no less than 6 characters long");
  });

  it("should throw an error if username is not unique", () => {
    expect(() =>
      userDb.addUser({ id: 4, username: "samisaeed", numOfPosts: 5 })
    ).toThrowError("Username must be unique");
  });

  it("should add a user if username is valid and unique", () => {
    userDb.addUser({ id: 5, username: "uniqueUser", numOfPosts: 1 });
    expect(userDb.findUserById(5)).toEqual({
      id: 5,
      username: "uniqueUser",
      numOfPosts: 1,
    });
  });
});
describe("PostDatabase", () => {
  let postDb;

  beforeEach(() => {
    postDb = new PostDatabase();
  });

  it("should throw an error if title is less than 5 words", () => {
    expect(() =>
      postDb.addPost({
        id: 1,
        title: "Too short",
        content: "Content is long enough though",
      })
    ).toThrowError("Title must be a string no less than 5 words long");
  });

  it("should throw an error if content is less than 10 words", () => {
    expect(() =>
      postDb.addPost({
        id: 2,
        title: "This title is long enough",
        content: "Too short",
      })
    ).toThrowError("Content must be no less than 10 words long");
  });

  it("should add a post if title and content are valid", () => {
    postDb.addPost({
      id: 3,
      title: "This is a valid title",
      content:
        "This is an example of a valid content block,should pass said tests.",
    });
    expect(postDb.findPostById(3)).toEqual({
      id: 3,
      title: "This is a valid title",
      content:
        "This is an example of a valid content block,should pass said tests.",
    });
  });
});
