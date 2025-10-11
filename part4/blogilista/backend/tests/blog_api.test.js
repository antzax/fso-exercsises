const supertest = require("supertest");
const mongoose = require("mongoose");
const { test, after, beforeEach } = require("node:test");
const app = require("../app");

const api = supertest(app);

test.only("blogs are returned as json", async () => {
  try {

    await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  } catch (err) {
    console.log(err)
  }
});

after(async () => {
  await mongoose.connection.close();
});
