import DataBase, { UserDataBase, PostDataBase } from "../src/index.js";

describe("DataBase", () => {
    let database
    beforeEach(() => {
        database = new DataBase([{id: 1}, {id: 2}, {id: 3}])
    })
    it("should exist", () => {
        expect(database).toBeInstanceOf(DataBase)
    })
    it("should return the array containing data", () => {
        expect(database.getData()).toEqual([{id: 1}, {id: 2}, {id: 3}])
    })
    it("should add an object with an id property", () => {
        database.add({test: "test"})
        expect(database.getData()).toEqual([{id: 1}, {id: 2}, {id: 3}, {id: 10, test: "test"}])
    })
    it("should remove an object by id", () => {
        database.remove(3)
        expect(database.getData()).toEqual([{id: 1}, {id: 2}])
    })
    it("should return the object by Id", () => {
        expect(database.findById(2)).toEqual({id: 2})
    })
    it("should be able to update an index in the array", () => {
        database.update(2, {id: 2, updated: "yes"})
        expect(database.getData()).toEqual([{id: 1}, {id: 2, updated: "yes"}, {id: 3}])
    })
})

describe("UserDataBase", () => {
    let userDataBase
    beforeEach(() => {
        userDataBase = new UserDataBase(new DataBase([{id: 1, user: "Alistair"}, {id: 2, user: "Oliver"}]))
    })
    it("should exist", () => {
        expect(userDataBase).toBeInstanceOf(UserDataBase)
    })
    it("should return the data stored", () => {
        expect(userDataBase.getData()).toEqual([{id: 1, user: "Alistair"}, {id: 2, user: "Oliver"}])
    })
    it("should be able to add an user if at least 6 characters", () => {
        userDataBase.add({user: "Maximus"})
        expect(userDataBase.getData()).toEqual([{id: 1, user: "Alistair"}, {id: 2, user: "Oliver"}, {id: 10, user: "Maximus"}])
    })
    it("should remove a user from the database", () => {
        userDataBase.remove(2)
        expect(userDataBase.getData()).toEqual([{id: 1, user: "Alistair"}])
    })
    it("should return the object by id", () => {
        expect(userDataBase.findById(1)).toEqual({id: 1, user: "Alistair"})
    })
    it("should update an user by id if user at least 6 characters", () => {
        userDataBase.update(2, {id: 2, user: "Jenkins"})
        expect(userDataBase.getData()).toEqual([{id: 1, user: "Alistair"}, {id: 2, user: "Jenkins"}])
    })
})

describe("PostDataBase", () => {
    let postDataBase
    beforeEach(() => {
        postDataBase = new PostDataBase(new DataBase([{id: 1, title: "Got a job", content: "Started working at a local food shop"}, {id: 2, title: "Thought I looked cute", content: "Might delete later"}]))
    })
    it("should exist", () => {
        expect(postDataBase).toBeInstanceOf(PostDataBase)
    })
    it("should return the data stored", () => {
        expect(postDataBase.getData()).toEqual([{id: 1, title: "Got a job", content: "Started working at a local food shop"}, {id: 2, title: "Thought I looked cute", content: "Might delete later"}])
    })
    it("should be able to add an user if title.length >= 5, content.length >= 10", () => {
        postDataBase.add({title: "new title", content: "adding posts to data"})
        expect(postDataBase.getData()).toEqual([{id: 1, title: "Got a job", content: "Started working at a local food shop"}, {id: 2, title: "Thought I looked cute", content: "Might delete later"}, {id: 10, title: "new title", content: "adding posts to data"}])
    })
    it("should remove a user from the database", () => {
        postDataBase.remove(2)
        expect(postDataBase.getData()).toEqual([{id: 1, title: "Got a job", content: "Started working at a local food shop"}])
    })
    it("should return the object by id", () => {
        expect(postDataBase.findById(1)).toEqual({id: 1, title: "Got a job", content: "Started working at a local food shop"})
    })
    it("should update an post by id if title.length >= 5, content.length >= 10", () => {
        postDataBase.update(2, {id: 2, title: "changing", content: "the content to new"})
        expect(postDataBase.getData()).toEqual([{id: 1, title: "Got a job", content: "Started working at a local food shop"}, {id: 2, title: "changing", content: "the content to new"}])
    })
})