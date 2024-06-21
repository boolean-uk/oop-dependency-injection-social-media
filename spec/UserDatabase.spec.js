import User from '../src/User.js'
import UserDatabase from '../src/UserDatabase.js'

describe('User Database', () => {
    let user
    let userDatabase

    beforeEach(() => {
        user = new User(1, 'username123')
        userDatabase = new UserDatabase()
    })

    it('should add user', () => {
        userDatabase.add(user)
        expect(userDatabase.findById(1)).toEqual(user)
    })

    it('should remove user', () => {
        userDatabase.add(user)
        userDatabase.remove(1)
        expect(() => userDatabase.findById(1)).toThrowError('Item not found')
    })

    it('should find user', () => {
        userDatabase.add(user)
        expect(userDatabase.findById(1)).toEqual(user)
    })

    it('should update user', () => {
        userDatabase.add(user)
        const updatedUser = new User(1, 'newusername123')
        userDatabase.update(1, updatedUser)
        expect(userDatabase.findById(1).username).toEqual('newusername123')
    })
})
