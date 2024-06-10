import Database from "../src/index.js"
import { v4 as uuidv4 } from "uuid"

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
		expect(db.data.length).toBe(0)
	})

	//Test addData

	it("should be able to add one or more entries with different auto-generated ids", () => {
		db.addData({ username: "JohnyBeGood" })
		expect(db.data.length).toBe(1)
		db.addData({ username: "MaryBeBad" })
		expect(db.data.length).toBe(2)
		expect(db.data[0]).toEqual({
			username: "JohnyBeGood",
			id: "cb0cad71-3a90-46dc-bb5f-f74518c9457a",
		})
		expect(db.data[1]).toEqual({
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
		expect(db.data.length).toBe(3)

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
		expect(db.data.length).toBe(3)
		expect(db.data[2].username).toBe("ABlokeInThePub")

		db.removeData("4671db17-3c2e-4cdd-8e61-357bc767610b")
		expect(db.data.length).toBe(2)
	})

	it("should throw an error if wrong or no id is provided to removeData", () => {
		db.addData({ username: "JohnyBeGood" })
		db.addData({ username: "MaryBeBad" })
		db.addData({ username: "ABlokeInThePub" })
		expect(db.data.length).toBe(3)

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
		expect(db.data[2].username).toBe("ABlokeInThePub")

		db.updateData("4671db17-3c2e-4cdd-8e61-357bc767610b", {
			username: "ADifferentBlokeInThePub",
		})
		expect(db.data[2].username).toBe("ADifferentBlokeInThePub")
	})

	it("should throw an error if wrong or no id is provided to updateData", () => {
		db.addData({ username: "JohnyBeGood" })
		db.addData({ username: "MaryBeBad" })
		db.addData({ username: "ABlokeInThePub" })
		expect(db.data[2].username).toBe("ABlokeInThePub")

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
