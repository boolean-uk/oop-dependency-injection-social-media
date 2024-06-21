const { UserDatabase, PostsDatabase } = require("../src");

describe("UsersDb", () => {
	let usersDB;
	beforeEach(() => {
		usersDB = new UserDatabase();
	});

	it("Should only add users with valid names", () => {
		expect(usersDB.add({ name: "Rafa" })).toBeFalse();
		expect(usersDB.add({ name: 123 })).toBeFalse();

		expect(usersDB.add({ name: "Rafael" })).toBeTruthy();
	});

	it("Should not add users with the same names", () => {
		expect(usersDB.add({ name: "Rafael" })).toBeTruthy();
		expect(usersDB.add({ name: "Rafael" })).toBeFalse();
	});

	it("Should remove users", () => {
		const id = usersDB.add({ name: "Rafael" });
		expect(usersDB.remove(id)).toBeTrue();
		expect(usersDB.add({ name: "Rafael" })).toBeTruthy();
	});

	it("Should find a user by its id", () => {
		const id = usersDB.add({ name: "Rafael" });
		expect(usersDB.findById(id)).toEqual({ id, name: "Rafael" });
	});
});

describe("PostsDb", () => {
	let postsDB;
	beforeEach(() => {
		postsDB = new PostsDatabase();
	});

	it("Should add only valid posts", () => {
		expect(postsDB.add({ title: "I amn't valid" })).toBeFalse();
		expect(postsDB.add({ title: 123 })).toBeFalse();
		expect(postsDB.add({ title: "I AM a valid title" })).toBeFalse();
		expect(
			postsDB.add({
				title: "I AM a valid title",
				content: "I perfectly valid as well because my dev says so!",
			})
		).toBeTruthy();
	});
});
