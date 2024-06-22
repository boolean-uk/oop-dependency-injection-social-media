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
        
    it("should exist",()=>{
        expect(database).toBeInstanceOf(Database);
        expect(userDatabase).toBeInstanceOf(UserDatabase);
         expect(postDatabase).toBeInstanceOf(PostDatabase);
    })

    it("should add data", () => {
        expect(database.list().length).toBe(0);
        database.add({
          name: "Zoltan Chivey",
          placeOfBirth: "Mahakama",
          currentLocation: "Vizima",
        })

        database.add({
          name: "Geralt of Rivia",
          placeOfBirth: "Rivia",
          currentLocation: "Vizima",
        });
        expect(database.list().length).toBe(2);
      });
      

   // should remove data
    it("should remove data", () => {
      expect(database.list().length).toBe(0);
      let row1 = database.add({
        name: "Zoltan Chivey",
        placeOfBirth: "Mahakama",
        currentLocation: "Vizima",
      });
      let row2 = database.add({
        name: "Geralt of Rivia",
        placeOfBirth: "Rivia",
        currentLocation: "Vizima",
      });
      expect(database.list().length).toBe(2);
      database.remove(row2.id);
      expect(database.list().length).toBe(1);
    });

  

    //should search data
      it("should find data by id", () => {
        let row1 = database.add({
          name: "Zoltan Chivey",
          placeOfBirth: "Mahakama",
          currentLocation: "Vizima",
        });
        let row2 = database.add({
          name: "Geralt of Rivia",
          placeOfBirth: "Rivia",
          currentLocation: "Vizima",
        });
    
        let result = database.findById(row1.id);
        expect(result.name).toBe("Zoltan Chivey");
      });
    

    //should update data
      it("should update data", () => {
        let row = database.add({
          name: "Geralt of Rivia",
          placeOfBirth: "Rivia",
          currentLocation: "Vizima",
        });
        let result = database.update(row.id, { currentLocation: "Novigrad" });
    
        expect(result.currentLocation).toBe("Novigrad");
      });
      it("should enforce that users have a unique username that is a string no less than 6 characters long whenever adding or changing a user", () => {
        expect(() => {
          userDatabase.add({ username: "" });
        }).toThrow("username must have minimum 6 characters");
        expect(() => {
          userDatabase.add({ username: "jane07" });
        }).toThrow("username must have minimum 6 characters");
        expect(() => {
          userDatabase.add({ username: "jane007" });
        }).not.toThrow("username must have minimum 6 characters");
      });
      it("should enforce that posts have a title string no less than 5 _words_ long, and a content of no less than 10 words whenever adding or changing a post", () => {
        expect(() => {
          postDatabase.add({ title: "", content: "" });
        }).toThrow("post title must have minimum 5 words");
        expect(() => {
          postDatabase.add({ title: "Hello World", content: "" });
        }).toThrow("post title must have minimum 5 words");
        expect(() => {
          postDatabase.add({ title: "Hello World At Vivald's Bank", content: "" });
        }).toThrow("content must have minimum 6 words");
        expect(() => {
          postDatabase.add({
            title: "Hello World At Vivald's Bank",
            content: "Vivaldi",
          });
        }).toThrow("content must have minimum 6 words");
        expect(() => {
            postDatabase.add({
              title: "Hello World At Vivald's Bank",
              content: "What brings you to this neck of the woods",
            });
          }).not.toThrow("content must have minimum 6 words");
      });
    
})
