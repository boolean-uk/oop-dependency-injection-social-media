import { users, posts } from "../src/dummydata.js";
import Database from "../src/Database.js";
import UserDatabase from "../src/UserDatabase.js";

describe("Database", () => {
    let myDatabase

    beforeEach(() => {
        myDatabase = new Database([...users])
    })


  it("should construct with data and return the data with a getData method", () => {
    expect(myDatabase.getData()).toEqual(users)
  });

  it("should find a data object by its ID", () => {
    expect(myDatabase.findById(5)).toEqual({ id: 5, username: "bob_builder", email: 'bobbuilder@example.com' })
  })

  it("should update data after finding it by ID", () => {
    myDatabase.updateById(1, 'username', 'Mr_Pistachio')

    expect(myDatabase.findById(1).username).toEqual('Mr_Pistachio')
  })

  it("should remove data by ID", () => {
    myDatabase.removeById(1)

    expect(() => {myDatabase.findById(1)}).toThrowError('No data found with this ID')
  })
});

describe("UserDatabase", () => {
    let myUserDatabase;

    beforeEach(() => {
        myUserDatabase = new UserDatabase(new Database([...users]))
    })

    it('should have the same detData method as injected database', () =>{
        
       expect(myUserDatabase.getData()).toEqual([...users])
    })

    it('should have the same getById method as injected database', () =>{
        
        expect(myUserDatabase.findById(5)).toEqual({ id: 5, username: "bob_builder", email: 'bobbuilder@example.com' })
     })

     it('should have the same update method as injected database', () => {
        myUserDatabase.updateById(1, 'username', 'Mr_Pistachio')

        expect(myUserDatabase.findById(1).username).toEqual('Mr_Pistachio')
     })
})