import { PostDatabase } from "../src/post-database.js"

describe('UserDatabase', ()=> {
  
  let myPostDb
  beforeEach(() => {
    myPostDb = new PostDatabase
    myPostDb.add('Im learning aboud Object oriented cool1', 'Object oriented is all about that and this and those and they are so good!')
    myPostDb.add('Im learning aboud Object oriented cool2', 'Object oriented is all about that and this and those and they are so good!')
    myPostDb.add('Im learning aboud Object oriented cool3', 'Object oriented is all about that and this and those and they are so good!')
    myPostDb.add('Im learning aboud Object oriented cool5', 'Object oriented is all about that and this and those and they are so good!')
  })

  it('should be an PostDatabase', () => {
    expect(myPostDb).toBeInstanceOf(PostDatabase)
  })
  
  it('should Postdatabase length be 4', () => {
    expect(myPostDb.getPostDb.length).toBe(4)
  })
  
  it('should length be 3 after the remove ', () => {
    myPostDb.remove(4)
    expect(myPostDb.getPostDb.length).toBe(3)
  })

  it('should change content: ', () => {
    myPostDb.update( 4,'Im learning aboud Object oriented cool2', 'Object oriented is all about that and this and those and they are so good!1')
    const result = myPostDb.getPostDb
    expect(result[3]).toEqual(
      Object({ id: 4, name: Object({ newTitle: 'Im learning aboud Object oriented cool2', newContent: 'Object oriented is all about that and this and those and they are so good!1' }) })
    )
  })
})