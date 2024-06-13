import Database, { UserDatabase, PostDatabase } from "../src/index.js";

describe("Core Criteria", () => {
        let database;
        let userDatabase;
        let postDatabase;
      
        beforeEach(() => {
          database = new Database([]);
          userDatabase = new UserDatabase(database);
          postDatabase = new PostDatabase(database);
        });
        
      
    it("should add data",()=>{
        expect(database).toBeInstanceOf(Database);
        expect(userDatabase).toBeInstanceOf(UserDatabase);
         expect(postDatabase).toBeInstanceOf(PostDatabase);

    })

   // it("should remove data",()=>{})

    //it("should search data",()=>{})

    //it("should update data",()=>{})
});
