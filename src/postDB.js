import Database from "./index.js"

class PostDataBase {
	#database

	constructor(database) {
		this.#database = database
	}

	getData() {
		return this.#database.getData()
	}

	findPostById(id) {
		return this.#database.findDataById(id)
	}

	checkPostValidity(post) {
		if (!post.title || !post.content) {
			throw new Error("A post must have a title and content")
		}
		if (post.title.split(" ").length < 5) {
			throw new Error(`A post's title must be at least 5 words long`)
		}
		if (post.content.split(" ").length < 10) {
			throw new Error(
				`A post's content must be at least 10 words long`
			)
		}
		if (
			typeof post.title !== "string" ||
			typeof post.content !== "string"
		) {
			throw new Error("Post title and post content must be strings")
		}
		return true
	}

	addPost(post) {
		if (!post || typeof post !== "object") {
			throw new Error("The data provided must be an object")
		}

		if (this.checkPostValidity(post)) {
			const existing = this.getData().find(
				(pst) => post.title === pst.title
			)
			if (existing) {
				throw new Error("A post with the same title, already exists")
			}

			this.#database.addData(post)
		}
	}

	removePost(id) {
		return this.#database.removeData(id)
	}

	updatePost(id, data) {
		if(this.checkPostValidity(data))
		return this.#database.updateData(id, data)
	}
}

export default PostDataBase

