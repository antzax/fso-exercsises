const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const { test, after, beforeEach, describe } = require("node:test");
const app = require("../app");
const helper = require("../utils/user_helper");
const api = supertest(app);
const User = require("../models/user");
const bcrypt = require("bcrypt");

describe("when there is users saved in database", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const user = new User({
      username: "root",
      passwordHash: bcrypt.hash("sekret", 10),
    });

    await user.save();
  });

  test.only("user can be saved", async () => {
    const initialUsers = await helper.usersInDB();

    const newUser = {
      name: "name",
      username: "username",
      password: "password",
    };

    await api.post("/api/users").send(newUser).expect(201).expect('Content-Type', /application\/json/)

    const finalUsers = await helper.usersInDB();
    const usernames = await finalUsers.map((u) => u.username);

    assert.strictEqual(finalUsers.length, initialUsers.length + 1);
    assert(usernames.includes(newUser.username));
  });

  test("user not saved when username not unique", async () => {
    const initialUsers = await helper.usersInDB();

    const newUser = {
      name: "root",
      username: "root",
      password: "root",
    };

    await api.post("/api/users").send(newUser).expect(400).expect('Content-Type', /application\/json/);

    const finalUsers = await helper.usersInDB();

    assert.strictEqual(initialUsers.length, finalUsers.length);
  });

  test("user not saved when password too short", async () => {
    const initialUsers = await helper.usersInDB();

    const shortPasswordUser = {
      name: "testor",
      username: "test123",
      password: "r",
    };

    await api.post("/api/users").send(shortPasswordUser).expect(400);

    const finalUsers = await helper.usersInDB();

    assert.strictEqual(initialUsers.length, finalUsers.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
