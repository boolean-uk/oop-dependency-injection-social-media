import Post from '../src/Post.js'
import PostDatabase from '../src/PostDatabase.js'

describe('Post Database', () => {
    let post
    let postDatabase

    beforeEach(() => {
        post = new Post(1, 'This is a valid post title', 'This content is sufficiently long for the test. It contains more than ten words.')
        postDatabase = new PostDatabase()
    })

    it('should add post', () => {
        postDatabase.add(post)
        expect(postDatabase.findById(1)).toEqual(post)
    })

    it('should remove post', () => {
        postDatabase.add(post)
        postDatabase.remove(1)
        expect(() => postDatabase.findById(1)).toThrowError('Item not found')
    })

    it('should find post', () => {
        postDatabase.add(post)
        expect(postDatabase.findById(1)).toEqual(post)
    })

    it('should update post', () => {
        postDatabase.add(post)
        const updatedPost = new Post(1, 'Updated valid post title for test', 'Updated content that is sufficiently long for the testing purpose. It has more than ten words.')
        postDatabase.update(1, updatedPost)
        expect(postDatabase.findById(1).title).toEqual('Updated valid post title for test')
    })
})
