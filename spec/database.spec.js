import { users, posts } from "../src/dummydata.js";
import Database from "../src/Database.js";

describe("Database", () => {
  it("should construct with data and return the data with a getData method", () => {
    const myDatabase = new Database(users)
    expect(myDatabase.getData()).toEqual(users)
  });
});
