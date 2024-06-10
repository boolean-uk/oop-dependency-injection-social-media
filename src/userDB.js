import Database from "./index.js"

class UserDatabase {
	#database

	constructor(database) {
		this.#database = database
	}

	getData() {
		return this.#database.getData()
	}

	findUserById(id) {
		return this.#database.findDataById(id)
	}

	addUser(user) {
		if (!user || typeof user !== "object") {
			throw new Error("The data provided must be an object")
		}
		if (
			typeof user.username !== "string" ||
			user.username.length < 7
		) {
			throw new Error(
				"Username must be a string with more than 6 characters"
			)
		}
		const existing = this.getData().find(
			(usr) => user.username === usr.username
		)
		if (existing) {
			throw new Error(
				"Username must be unique and have more than 6 characters"
			)
		}

		this.#database.addData(user)
	}

	removeUser(id) {
		return this.#database.removeData(id)
	}

	updateUser(id, data) {
		return this.#database.updateData(id, data)
	}
}

export default UserDatabase

// const db = new Database()
// const nud = new UserDatabase(new Database())

// nud.addUser({ username: "MackTheKnife" })
// nud.addUser({ username: "JackTheRipper" })
// nud.addUser({ username: "SackTheKnife" })
// console.log(nud.getData())
// nud.addUser({ username: "MackTheKnife" })

// nud.addUser({username:'Mac'})
// console.log('afterrrr',nud.getData());
// nud.addUser({ username: 'Mack' })
// console.log('tttt',nud.findUserById("cb0cad71-3a90-46dc-bb5f-f74518c9457a"))
// nud.removeUser("cb0cad71-3a90-46dc-bb5f-f74518c9457a")

// console.log(nud.getData());
