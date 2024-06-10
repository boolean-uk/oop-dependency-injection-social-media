import { users, posts } from "../src/dummydata.js";
import Database from "../src/Database.js";

describe("Database", () => {
    let myDatabase
    beforeEach(() => {
        myDatabase = new Database(users)
    })


  it("should construct with data and return the data with a getData method", () => {
    expect(myDatabase.getData()).toEqual(users)
  });

  it("should find a data object by its ID", () => {
    expect(myDatabase.findById(1)).toEqual({ id: 1, username: "johndoe123", email: "johndoe@example.com" })
  })

  it("should update data after finding it by ID", () => {
    myDatabase.updateById(1, 'username', 'Mr_Pistachio')

    expect(myDatabase.findById(1)).toEqual({ id: 1, username: "Mr_Pistachio", email: "johndoe@example.com" })
  })
});
