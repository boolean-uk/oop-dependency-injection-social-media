const { Database, UserDatabase, PostDatabase } = require('../src/index');

describe('Database', () => {
    let db;

    beforeEach(() => {
        const data = new Map([[1, { id: 1, value: 'item1' }], [2, { id: 2, value: 'item2' }]]);
        db = new Database(data);
    });

    it('should add an item', () => {
        const newItem = { id: 3, value: 'item3' };
        db.add(3, newItem);
        expect(db.findById(3)).toEqual(newItem);
    });

    it('should remove an item', () => {
        db.remove(1);
        expect(db.findById(1)).toBeUndefined();
    });

    it('should find an item by id', () => {
        const item = db.findById(1);
        expect(item).toEqual({ id: 1, value: 'item1' });
    });

    it('should update an item', () => {
        const updatedItem = { id: 1, value: 'updatedItem' };
        db.update(1, updatedItem);
        expect(db.findById(1)).toEqual(updatedItem);
    });
});

describe('UserDatabase', () => {
    let userDb;

    beforeEach(() => {
        const db = new Database(new Map());
        userDb = new UserDatabase(db);
    });

    it('should add a user', () => {
        const user = { id: 1, username: 'username123' };
        userDb.addUser(user);
        expect(userDb.database.findById(1)).toEqual(user);
    });

    it('should throw error if username is less than 6 characters', () => {
        const user = { id: 1, username: 'user' };
        expect(() => userDb.addUser(user)).toThrowError('Username must be a string of at least 6 characters');
    });
});

describe('PostDatabase', () => {
    let postDb;

    beforeEach(() => {
        const db = new Database(new Map());
        postDb = new PostDatabase(db);
    });

    it('should add a post', () => {
        const post = { id: 1, title: 'Post Title One, Two, Three, Four, Five', content: 'Content with more than 10 words, one, two, three, four, five' };
        postDb.addPost(post);
        expect(postDb.database.findById(1)).toEqual(post);
    });

    it('should throw error if title is less than 5 words', () => {
        const post = { id: 1, title: 'Title', content: 'Post Content, Content, One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten' };
        expect(() => postDb.addPost(post)).toThrowError('Title must be a string of at least 5 words');
    });

    it('should throw error if content is less than 10 words', () => {
        const post = { id: 1, title: 'Post Title', content: 'Content' };
        expect(() => postDb.addPost(post)).toThrowError('Content must be a string of at least 10 words');
    });
});
