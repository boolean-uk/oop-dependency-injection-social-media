import { v4 as uuidv4 } from "uuid"

const ids = new Map()
ids.set(1, "cb0cad71-3a90-46dc-bb5f-f74518c9457a")
ids.set(2, "c8063fae-5bed-4cc8-84ca-7a995b63fd27")
ids.set(3, "4671db17-3c2e-4cdd-8e61-357bc767610b")
ids.set(4, "bcd8c6e9-80f8-41d4-9a04-df718d537085")
ids.set(5, "f7e4f895-9c90-4e99-9104-1845661994d7")
ids.set(6, "b1ce3bbd-0ef8-449c-8b5c-2f870645f61d")
ids.set(7, "18061dc0-8e92-4b12-8ac6-7d1627b991da")
ids.set(8, "6348bc42-0e62-47bd-9828-ad5f2e3ddcd0")
ids.set(9, "5cc95eea-c597-4e33-84a6-8406d5a599af")
ids.set(10, "2bc1042d-6731-4c6a-b08f-f4224943873e")

class Database {
	#data

	constructor(idGenerator = uuidv4, data = []) {
		this.idGenerator = uuidv4
		this.#data = data
	}

	// get data() {
	// 	return [...this.#data]
	// }
	getData() {
		return [...this.#data]
	}

	createIds() {
		const nextId = this.#data.length + 1
		return ids.get(nextId)
	}

	addData(data) {
		if (!data || typeof data !== "object") {
			throw new Error("The data provided must be an object")
		} else {
			// const newData = { id: this.idGenerator(), ...data }
			data.id = this.createIds()
			const newData = { ...data }
			this.#data.push(newData)
		}
	}

	findDataById(id) {
		const idIndex = this.#data.findIndex((idi) => idi.id === id)
		if (!id) throw new Error("An ID must be provided")
		if (idIndex === -1) {
			return false
		} else {
			return [idIndex, this.#data[idIndex]]
		}
	}

	removeData(id) {
		if (!id) {
			throw new Error("An ID must be provided")
		}
		const entryToRemove = this.findDataById(id)[1]
		if (!entryToRemove) {
			throw new Error(
				`No data with id = ${id} were found in the database`
			)
		} else {
			this.#data = this.#data.filter((dt) => dt.id !== id)
		}
	}

	updateData(id, newData) {
		if (!id) {
			throw new Error(
				"An ID of the entry to be updated, must be provided"
			)
		}
		if (typeof newData !== "object") {
			throw new Error(
				`New data must be an object with a numerical ID`
			)
		}
		const index = this.findDataById(id)[0]
		if (index) {
			this.#data[index] = { ...this.#data[index], ...newData }
		} else {
			throw new Error(
				`No data with id = ${id} were found in the database`
			)
		}
	}
}

export default Database


// const udb = new Database()
// udb.addData({ userName: "JohnyBGood" })
// udb.addData({ userName: "MaryBeBad" })
// udb.addData({ userName: "ABlokeInThePub" })

// console.log(udb.getData());

// console.log(udb.findDataById('c8063fae-5bed-4cc8-84ca-7a995b63fd27'))