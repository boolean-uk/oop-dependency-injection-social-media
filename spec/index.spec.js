import {
  Database,
  UserDatabase,
  User,
  PostDatabase,
  Post,
} from "../src/index.js";

describe("TodoList", () => {
  let users;
  let posts;

  beforeEach(() => {
    users = new UserDatabase(new Database());
    posts = new PostDatabase(new Database());
  });

  it("should exist", () => {
    expect(users).toBeInstanceOf(UserDatabase);
    expect(posts).toBeInstanceOf(PostDatabase);
  });

  it("should add a new user ", () => {
    users.add(new User("Tom", "Green", 35, "tom-green"));

    users.add(new User("Janey", "Perdo", 25, "janey-p"));

    expect(users.getUsers().length).toBe(2);
  });

  it("should check for username validation", () => {
    expect(() => users.add(new User("Tom", "Green", 35, "gre"))).toThrow(
      new Error("the username should be at least 6 characters long")
    );
  });

  it("should remove user by id ", () => {
    users.add(new User("Tom", "Green", 35, "tom-green"));

    users.add(new User("Janey", "Perdo", 25, "janey-p"));

    users.remove(1);

    expect(users.getUsers().length).toBe(1);
  });

  it("should throw an error if user to remove is not found ", () => {
    users.add(new User("Tom", "Green", 35, "tom-green"));

    users.add(new User("Janey", "Perdo", 25, "janey-p"));

    expect(() => users.remove(3)).toThrow(
      new Error("data with ID 3 is not found")
    );
  });

  it("should update an existed user ", () => {
    users.add(new User("Tom", "Green", 35, "tom-green"));

    users.add(new User("Janey", "Perdo", 25, "janey-p"));

    users.update(1, "age", 40);

    expect(users.getUsers()[0].age).toBe(40);
  });

  //-----

  it("should add a new post ", () => {
    posts.add(
      new Post(
        "let's code",
        "Everyone should know how to code a computer, because it teaches you how to think!- Steve Jobs"
      )
    );

    posts.add(
      new Post(
        "Asking Questions",
        "Try as you can to solve the problem before asking your teacher. Coming to the resolution on your own will help you grow and become a stronger coder."
      )
    );

    expect(posts.getPosts().length).toBe(2);
  });

  it("should check for title and content validations", () => {
    expect(() =>
      posts.add(
        new Post(
          "code",
          "Everyone should know how to code a computer, because it teaches you how to think!- Steve Jobs"
        )
      )
    ).toThrow(
      new Error("the post's title should be at least 5 characters long")
    );
  });

  it("should remove post by id ", () => {
    posts.add(
      new Post(
        "let's code",
        "Everyone should know how to code a computer, because it teaches you how to think!- Steve Jobs"
      )
    );

    posts.add(
      new Post(
        "Asking Questions",
        "Try as you can to solve the problem before asking your teacher. Coming to the resolution on your own will help you grow and become a stronger coder."
      )
    );

    posts.remove(1);
    expect(posts.getPosts().length).toBe(1);
  });

  it("should throw an error if post to remove is not found ", () => {
    posts.add(
      new Post(
        "Asking Questions",
        "Try as you can to solve the problem before asking your teacher. Coming to the resolution on your own will help you grow and become a stronger coder."
      )
    );
    expect(() => posts.remove(2)).toThrow(
      new Error("data with ID 2 is not found")
    );
  });

  it("should update an existed post ", () => {
    posts.add(
      new Post(
        "Asking Questions",
        "Try as you can to solve the problem before asking your teacher. Coming to the resolution on your own will help you grow and become a stronger coder."
      )
    );

    posts.update(1, "title", "let's learn");

    expect(posts.getPosts()[0].title).toBe("let's learn");
  });
});
