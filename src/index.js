class Database {
    constructor(data) {
        this.data = new Map(data);
    }

    add(id, item) {
        this.data.set(id, item);
    }

    remove(id) {
        this.data.delete(id);
    }

    findById(id) {
        return this.data.get(id);
    }

    update(id, item) {
        if (!this.data.has(id)) {
            throw new Error(`Item with id ${id} not found`);
        }
        this.data.set(id, item);
    }
}

class UserDatabase {
    constructor(database) {
        this.database = database;
    }

    addUser(user) {
        if (typeof user.username !== 'string' || user.username.length < 6) {
            throw new Error('Username must be a string of at least 6 characters');
        }
        this.database.add(user.id, user);
    }

    removeUser(id) {
        this.database.remove(id);
    }

    findUserById(id) {
        return this.database.findById(id);
    }

    updateUser(id, user) {
        this.database.update(id, user);
    }
}

class PostDatabase {
    constructor(database) {
        this.database = database;
    }

    addPost(post) {
        if (typeof post.content !== 'string' || post.content.split(' ').length < 10) {
            throw new Error('Content must be a string of at least 10 words');
        }
        if (typeof post.title !== 'string' || post.title.split(' ').length < 5) {
            throw new Error('Title must be a string of at least 5 words');
        }
        this.database.add(post.id, post);
    }

    removePost(id) {
        this.database.remove(id);
    }

    findPostById(id) {
        return this.database.findById(id);
    }

    updatePost(id, post) {
        this.database.update(id, post);
    }
}

module.exports = { Database, UserDatabase, PostDatabase };
