import { v4 as uuidv4 } from "uuid"
import Database from "../src/index.js"
import UserDatabase from "../src/userDB.js"
import PostDataBase from "../src/postDB.js"

describe("Database", () => {
	let db

	beforeEach(() => {
		db = new Database()
	})

	// Test Validity

	it("should be an instance of Databace", () => {
		expect(db).toBeInstanceOf(Database)
	})

	it("should start with data as an empty array", () => {
		expect(db.getData().length).toBe(0)
	})

	//Test addData

	it("should be able to add one or more entries with different auto-generated ids", () => {
		db.addData({ username: "JohnyBeGood" })
		expect(db.getData().length).toBe(1)
		db.addData({ username: "MaryBeBad" })
		expect(db.getData().length).toBe(2)
		expect(db.getData()[0]).toEqual({
			username: "JohnyBeGood",
			id: "cb0cad71-3a90-46dc-bb5f-f74518c9457a",
		})
		expect(db.getData()[1]).toEqual({
			username: "MaryBeBad",
			id: "c8063fae-5bed-4cc8-84ca-7a995b63fd27",
		})
	})

	it("should throw an error if wrong type of data are provided to addData", () => {
		expect(() => db.addData("Johny")).toThrowError(
			"The data provided must be an object"
		)
	})

	//Test findDataById

	it("should be able to find data with the provided id and return an array with the data andthe index of the data to be used in other functions", () => {
		db.addData({ username: "JohnyBeGood" })
		db.addData({ username: "MaryBeBad" })
		db.addData({ username: "ABlokeInThePub" })

		const found = db.findDataById(
			"c8063fae-5bed-4cc8-84ca-7a995b63fd27"
		)
		expect(found[0]).toBe(1)
		expect(found[1].username).toBe("MaryBeBad")
		expect(found[1].id).toBe("c8063fae-5bed-4cc8-84ca-7a995b63fd27")
	})

	it("should throw an error if no id is provided and be false if there is no entry with the provided id", () => {
		db.addData({ username: "JohnyBeGood" })
		db.addData({ username: "MaryBeBad" })
		db.addData({ username: "ABlokeInThePub" })
		expect(db.getData().length).toBe(3)

		expect(() => db.findDataById()).toThrowError(
			"An ID must be provided"
		)
		expect(db.findDataById("46b")).toBe(false)
	})

	//Test removeData

	it("should be able to find and remove an existing entry, using a provided id", () => {
		db.addData({ username: "JohnyBeGood" })
		db.addData({ username: "MaryBeBad" })
		db.addData({ username: "ABlokeInThePub" })
		expect(db.getData().length).toBe(3)
		expect(db.getData()[2].username).toBe("ABlokeInThePub")

		db.removeData("4671db17-3c2e-4cdd-8e61-357bc767610b")
		expect(db.getData().length).toBe(2)
	})

	it("should throw an error if wrong or no id is provided to removeData", () => {
		db.addData({ username: "JohnyBeGood" })
		db.addData({ username: "MaryBeBad" })
		db.addData({ username: "ABlokeInThePub" })
		expect(db.getData().length).toBe(3)

		expect(() => db.removeData("46b")).toThrowError(
			"No data with id = 46b were found in the database"
		)
		expect(() => db.removeData()).toThrowError(
			"An ID must be provided"
		)
	})

	//Test updateData

	it("should be able to update an entry by id with the provided data", () => {
		db.addData({ username: "JohnyBeGood" })
		db.addData({ username: "MaryBeBad" })
		db.addData({ username: "ABlokeInThePub" })
		expect(db.getData()[2].username).toBe("ABlokeInThePub")

		db.updateData("4671db17-3c2e-4cdd-8e61-357bc767610b", {
			username: "ADifferentBlokeInThePub",
		})
		expect(db.getData()[2].username).toBe("ADifferentBlokeInThePub")
	})

	it("should throw an error if wrong or no id is provided to updateData", () => {
		db.addData({ username: "JohnyBeGood" })
		db.addData({ username: "MaryBeBad" })
		db.addData({ username: "ABlokeInThePub" })
		expect(db.getData()[2].username).toBe("ABlokeInThePub")

		expect(() =>
			updateData("46b", {
				userName: "AnotherBlokeInThePub",
			}).toThrowError(
				"No data with id = 46b were found in the database"
			)
		)
		expect(() => db.updateData()).toThrowError(
			"An ID of the entry to be updated, must be provided"
		)
	})
})

describe("UserDatabase", () => {
	let udb

	beforeEach(() => {
		udb = new UserDatabase(new Database())
	})

	// Test Validity

	it("should be an instance of UserDatabace", () => {
		expect(udb).toBeInstanceOf(UserDatabase)
	})

	it("should start with data as an empty array", () => {
		expect(udb.getData().length).toBe(0)
	})

	//Test addUser

	it("should be able to add one or more entries with different auto-generated ids", () => {
		udb.addUser({ username: "JohnyBeGood" })
		expect(udb.getData().length).toBe(1)
		udb.addUser({ username: "MaryBeBad" })
		expect(udb.getData().length).toBe(2)
		expect(udb.getData()[0]).toEqual({
			username: "JohnyBeGood",
			id: "cb0cad71-3a90-46dc-bb5f-f74518c9457a",
		})
		expect(udb.getData()[1]).toEqual({
			username: "MaryBeBad",
			id: "c8063fae-5bed-4cc8-84ca-7a995b63fd27",
		})
	})

	it("should throw an error if wrong type of data, no data or invalid username are provided to addUser", () => {
		expect(() => udb.addUser("Johny")).toThrowError(
			"The data provided must be an object"
		)
		expect(() => udb.addUser({ username: "Mack" })).toThrowError(
			"Username must be a string with more than 6 characters"
		)
		expect(() => udb.addUser()).toThrowError(
			"The data provided must be an object"
		)
	})

	//Test removeUser

	it("should be able to find and remove an existing user, using a provided id", () => {
		udb.addUser({ username: "JohnyBeGood" })
		udb.addUser({ username: "MaryBeBad" })
		udb.addUser({ username: "ABlokeInThePub" })
		expect(udb.getData().length).toBe(3)
		expect(udb.getData()[2].username).toBe("ABlokeInThePub")

		udb.removeUser("4671db17-3c2e-4cdd-8e61-357bc767610b")
		expect(udb.getData().length).toBe(2)
	})

	it("should throw an error if wrong or no id is provided to removeUser", () => {
		udb.addUser({ username: "JohnyBeGood" })
		udb.addUser({ username: "MaryBeBad" })
		udb.addUser({ username: "ABlokeInThePub" })
		expect(udb.getData().length).toBe(3)

		expect(() => udb.removeUser("46b")).toThrowError(
			"No data with id = 46b were found in the database"
		)
		expect(() => udb.removeUser()).toThrowError(
			"An ID must be provided"
		)
	})

	//Test updateUser

	it("should be able to update an entry by id with the provided data", () => {
		udb.addUser({ username: "JohnyBeGood" })
		udb.addUser({ username: "MaryBeBad" })
		udb.addUser({ username: "ABlokeInThePub" })
		expect(udb.getData()[2].username).toBe("ABlokeInThePub")

		udb.updateUser("4671db17-3c2e-4cdd-8e61-357bc767610b", {
			username: "ADifferentBlokeInThePub",
		})
		expect(udb.getData()[2].username).toBe("ADifferentBlokeInThePub")
	})

	it("should throw an error if wrong or no id is provided to updateData", () => {
		udb.addUser({ username: "JohnyBeGood" })
		udb.addUser({ username: "MaryBeBad" })
		udb.addUser({ username: "ABlokeInThePub" })
		expect(udb.getData()[2].username).toBe("ABlokeInThePub")

		expect(() =>
			updateUser("46b", {
				userName: "AnotherBlokeInThePub",
			}).toThrowError(
				"No data with id = 46b were found in the database"
			)
		)
		expect(() =>
			udb.updateUser("", {
				userName: "AnotherBlokeInThePub",
			})
		).toThrowError(
			"An ID of the entry to be updated, must be provided"
		)
	})
})

describe("PostDatabase", () => {
	let pdb

	beforeEach(() => {
		pdb = new PostDataBase(new Database())
	})

	// Test Validity

	it("should be an instance of PostDatabace", () => {
		expect(pdb).toBeInstanceOf(PostDataBase)
	})

	it("should start with data as an empty array", () => {
		expect(pdb.getData().length).toBe(0)
	})

	//Test addPost

	it("should be able to add one or more entries with different auto-generated ids", () => {
		pdb.addPost({
			title: "Lorem ipsum dolor sit amet",
			content:
				"Nam malesuada, nunc sed mollis tempus, est dui rutrum velit,",
		})
		expect(pdb.getData().length).toBe(1)

		pdb.addPost({
			title: "2Lorem ipsum dolor sit amet2",
			content:
				"Nam malesuada, nunc sed mollis tempus, est dui rutrum velit,",
		})
		expect(pdb.getData().length).toBe(2)
		expect(pdb.getData()[0]).toEqual({
			title: "Lorem ipsum dolor sit amet",
			content:
				"Nam malesuada, nunc sed mollis tempus, est dui rutrum velit,",
			id: "cb0cad71-3a90-46dc-bb5f-f74518c9457a",
		})
		expect(pdb.getData()[1]).toEqual({
			title: "2Lorem ipsum dolor sit amet2",
			content:
				"Nam malesuada, nunc sed mollis tempus, est dui rutrum velit,",
			id: "c8063fae-5bed-4cc8-84ca-7a995b63fd27",
		})
	})

	it("should throw an error if wrong type of data, no data or invalid title/content are provided to addPost", () => {
		expect(() => pdb.addPost("Johny")).toThrowError(
			"The data provided must be an object"
		)
		expect(() => pdb.addPost({ username: "Mack" })).toThrowError(
			"A post must have a title and content"
		)
		expect(() => pdb.addPost()).toThrowError(
			"The data provided must be an object"
		)

		expect(() =>
			pdb.addPost({
				title: "Lorem ",
				content:
					"Nam malesuada, nunc sed mollis tempus, est dui rutrum velit,",
			})
		).toThrowError(`A post's title must be at least 5 words long`)
		expect(() =>
			pdb.addPost({
				title: "Lorem ipsum dolor sit amet",
				content: "Nam malesuada",
			})
		).toThrowError(`A post's content must be at least 10 words long`)
	})

	//Test updatePost
	it("should be able to update an entry by id with the provided data", () => {
		pdb.addPost({
			title: "Lorem ipsum dolor sit amet",
			content:
				"Nam malesuada, nunc sed mollis tempus, est dui rutrum velit,",
		})

		expect(pdb.getData()[0].title).toBe("Lorem ipsum dolor sit amet")
		expect(pdb.getData()[0].content).toBe(
			"Nam malesuada, nunc sed mollis tempus, est dui rutrum velit,"
		)
		expect(pdb.getData()[0].id).toBe(
			"cb0cad71-3a90-46dc-bb5f-f74518c9457a"
		)

		pdb.updatePost("cb0cad71-3a90-46dc-bb5f-f74518c9457a", {
			title: "Lorem ipsum dolor sit amet",
			content:
				"A different lorem ipsum dolor sit amet etc etc etc etc",
		})
		expect(pdb.getData()[0].content).toBe(
			"A different lorem ipsum dolor sit amet etc etc etc etc"
		)
	})

	it("should throw an error if wrong or no id is provided to updatePost", () => {
		pdb.addPost({
			title: "Lorem ipsum dolor sit amet",
			content:
				"Nam malesuada, nunc sed mollis tempus, est dui rutrum velit,",
		})
		expect(pdb.getData()[0].title).toBe("Lorem ipsum dolor sit amet")
		expect(pdb.getData()[0].content).toBe(
			"Nam malesuada, nunc sed mollis tempus, est dui rutrum velit,"
		)

		expect(() =>
			updatePost("46b", {
				title: "Lorem ipsum dolor sit amet",
				content:
					"A different lorem ipsum dolor sit amet etc etc etc etc",
			}).toThrowError(
				"No data with id = 46b were found in the database"
			)
		)
		expect(pdb.getData()[0].content).toBe(
			"Nam malesuada, nunc sed mollis tempus, est dui rutrum velit,"
		)
		expect(() =>
			pdb.updatePost('',{
				title: "Lorem ipsum dolor sit amet",
				content:
					"A different lorem ipsum dolor sit amet etc etc etc etc",
			})
		).toThrowError(
			"An ID of the entry to be updated, must be provided"
		)
	})
})
