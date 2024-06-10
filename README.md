# OOP - Dependency Injection

1. Fork and clone this repository
2. `npm ci` to install dependencies
3. `npx jasmine` to run any tests you create

## Core Criteria

Create a social media system that can organise users and posts

- Create a `Database` class that accepts an array in its constructor
    - This class should be able to add, remove, findById and update data in its array without letting someone directly access the array
    - It should not care about the specific type of data inside the array, but it should assume that every piece of data is at least an object with a numeric `id` property
- Create a `UserDatabase` and a `PostDatabase` class
    - Both of these classes should have a Database injected into them and provide the same add, remove, find and update functionality specifically for users and posts respectively
    - These new classes should not expose the internal `Database` class directly, that should be private
    - These classes should use the internal `Database` as its data store
- The `UserDatabase` class should enforce that users have a unique username that is a string no less than 6 characters long whenever adding or changing a user
- The `PostDatabase` class should enforce that posts have a title string no less than 5 _words_ long, and a content of no less than 10 words whenever adding or changing a post
- You must create at least one test for every function you create

## Extensions

1. Change the `Database` class so that it accepts a `Map` instead of an array
    - You should not have to change your User or Post database classes for the application to continue working, but you may need to change the internals of your Database class
    - This should give you an idea of why dependency injection is useful. You can change anything you like about a dependency without breaking the rest of the application
2. Let each user have their own instance of a `PostDatabase` so they can all create their own posts
3. Create a single class that lets you create posts for any user in their own database
