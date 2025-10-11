const assert = require('node:assert')
const supertest = require("supertest");
const mongoose = require("mongoose");
const { test, after, beforeEach } = require("node:test");
const app = require("../app");
const helper = require("../utils/blog_helper");
const api = supertest(app);
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test.only("blogs are returned as json", async () => {
  try {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  } catch (err) {
    console.log(err);
  }
});

test("blogs have field id not __id", async () => {
  const blogs = await helper.blogsInDb();
  assert('id' in blogs[0])
}); 

after(async () => {
  await mongoose.connection.close();
});
