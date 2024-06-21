class Database {
	#data;
	constructor(...data) {
		this.#data = data;
	}

	add(item) {
		const id = this.#data[this.#data.length - 1]?.id || 0 + 1;
		this.#data.push({
			...item,
			id,
		});
		return id;
	}

	remove(id) {
		const idx = this.findIndexById(id);
		if (idx === -1) return false;

		this.#data.splice(idx, 1);

		return true;
	}

	findById(id) {
		return this.#data.find((e) => e.id === id);
	}
	findIndexById(id) {
		return this.#data.findIndex((e) => e.id === id);
	}

	update(item) {
		if (!Object.keys(item).includes("id") || Object.keys(item).length < 2) {
			this.#data.splice(this.findIndexById(item.id), 1, item);
		}
	}

	has(property, value) {
		return this.#data.find(
			(e) => Object.hasOwnProperty(property) && e[property] === value
		)
			? true
			: false;
	}
}

class UserDatabase {
	#database;
	constructor(...data) {
		this.#database = new Database(...data);
	}

	add(user) {
		if (
			!Object.keys(user).includes("name") ||
			this.#hasName(user.name) ||
			typeof user.name !== "string" ||
			user.name.length < 6
		)
			return false;

		return this.#database.add(user);
	}

	#hasName(name) {
		return this.#database.has("name", name);
	}

	remove(id) {
		return this.#database.remove(id);
	}

	findById(id) {
		return this.#database.findById(id);
	}
}

class PostsDatabase {
	#database;
	constructor(...data) {
		this.#database = new Database(...data);
	}

	add(post) {
		if (
			!Object.keys(post).includes("title") ||
			typeof post.title !== "string" ||
			post.title.split(" ").length < 5 ||
			!Object.keys(post).includes("content") ||
			typeof post.content !== "string" ||
			post.content.split(" ").length < 10
		)
			return false;

		return this.#database.add(post);
	}

	remove(id) {
		return this.#database.remove(id);
	}

	findById(id) {
		return this.#database.findById(id);
	}
}

module.exports = { UserDatabase, PostsDatabase };
