import Database, { UserDatabase, PostDatabase } from '../src/index.js'

describe('Database', () => {
  let database
  let user
  let post

  beforeEach(() => {
    database = new Database()
    user = new UserDatabase(database)
    post = new PostDatabase(database)
  })

  it('should be able to add an user or an post', () => {
    user.data.add('LeonardoSaraceli')
    post.data.add(
      'My first title in this test',
      'My first content in this test and so far so good'
    )

    expect(database.data).toEqual([
      [1, 'LeonardoSaraceli'],
      [
        2,
        'My first title in this test',
        'My first content in this test and so far so good'
      ]
    ])
  })

  it('should be able to remove a user or a post', () => {
    user.data.add('LeonardoSaraceli')
    post.data.add(
      'My first title in this test',
      'My first content in this test and so far so good'
    )

    user.data.remove('LeonardoSaraceli')

    expect(database.data).toEqual([
      [
        2,
        'My first title in this test',
        'My first content in this test and so far so good'
      ]
    ])
  })

  it('should be able to find a user or a post', () => {
    user.data.add('LeonardoSaraceli')

    expect(database.find(1)).toEqual([1, 'LeonardoSaraceli'])
  })

  it('should be able to update a user or a post details', () => {
    user.data.add('LeonardoLodi')

    expect(user.data.update(1, 'LeonardoLodi', 'LeonardoSaraceli')).toEqual([
      1,
      'LeonardoSaraceli'
    ])
  })

  it('should throw an error if adding or updating an user incorrectly', () => {
    user.data.add('LeonardoSaraceli')

    expect(() => user.data.add('Leo')).toThrowError(
      'Username must be a string with at least 6 characters'
    )

    expect(() => user.data.add('LeonardoSaraceli')).toThrowError(
      'Username must be unique'
    )

    expect(() => user.data.update(1, 'LeonardoSaraceli', 'Leo')).toThrowError(
      'Username must be a string with at least 6 characters'
    )

    user.data.add('LeonardoLodi')

    expect(() =>
      user.data.update(1, 'LeonardoSaraceli', 'LeonardoLodi')
    ).toThrowError('Username must be unique')
  })

  it('should throw an error if adding or updating an post incorrectly', () => {
    post.data.add(
      'My first title in this test',
      'My first content in this test and so far so good'
    )

    expect(() =>
      post.data.add(
        'My first title',
        'My first content in this test and so far so good'
      )
    ).toThrowError('Title must be a string with at least 5 words')

    expect(() =>
      post.data.add('My first title in this test', 'My first content')
    ).toThrowError('Content must be a string with at least 10 words')

    expect(() =>
      post.data.update(1, 'My first title in this test', 'My first title')
    ).toThrowError('Title must be a string with at least 5 words')

    expect(() =>
      post.data.update(
        1,
        'My first content in this test and so far so good',
        'My first content'
      )
    ).toThrowError('Content must be a string with at least 10 words')
  })
})
