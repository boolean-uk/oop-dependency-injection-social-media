import { UserDatabase } from "../src/user-database.js"
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

  it('should follow the rulles', () => {
    expect(myUserDb.userRules('Farshad')).toBe(true)
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