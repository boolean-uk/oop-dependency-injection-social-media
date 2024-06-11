import { Database } from "../src/database.js"
import { PostDatabase } from "../src/post-database.js"
import { UserDatabase } from "../src/user-database.js"

describe('Database', () => {
  let myDb
  let add1
  let myArray
  beforeEach(() => {
    myDb = new Database()
    add1 = myDb.add('Farshad')
    myArray = myDb.myDatabase
  })

  it('should exist', () => {
    expect(myDb).toBeInstanceOf(Database)
  })

  it('should add ', () => {
    
    expect(myArray[0].name).toEqual('Farshad')
  })

  it('should remove ', () => {
    myDb.remove(1)
    expect(myArray).toEqual([])
  })

  it('should update ', () => {
    myDb.update(1, 'Shahi3d')
    expect(myArray[0].name).toBe('Shahi3d')
  })

  it('should find the id', () => {
    expect(myDb.findById(1)).toBe(0)
  })

  it('should lenght of array be 1', () => {
    expect(myArray.length).toBe(1)
  })
})

describe('UserDatabase', ()=> {
  
  let myUserDb
  beforeEach(() => {
    myUserDb = new UserDatabase
    myUserDb.add('Farshad')
    myUserDb.add('Nathan')
    myUserDb.add('Lighing')
    myUserDb.add('DarkSoul')
  })

  it('should be an UserDatabase', () => {
    expect(myUserDb).toBeInstanceOf(UserDatabase)
  })

  it('should add a user to database', () => {
    expect(myUserDb.userDataBase.length).toBe(4)
  })

  it('should length be 3 after the remove ', () => {
    myUserDb.removeById(4)
    expect(myUserDb.userDataBase.length).toBe(3)
  })

  it('should change DarkSoul to NightKing', () => {
    myUserDb.updateById(4, 'NightKing')
    const result = myUserDb.userDataBase
    expect(result[3].name).toBe('NightKing')
  })

})