const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const { test, after, beforeEach, describe } = require("node:test");
const app = require("../app");
const helper = require("../utils/blog_helper");
const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("deleted blogs");
  await Blog.insertMany(helper.initialBlogs);
  console.log("added blogs");
});

describe("blogs api", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blogs have field id not __id", async () => {
    const blogs = await helper.blogsInDb();
    assert("id" in blogs[0]);
  });

  test("blogs can be added", async () => {
    const initialBlogs = await helper.blogsInDb();

    await api
      .post("/api/blogs")
      .send(helper.newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAfter = await helper.blogsInDb();

    assert.strictEqual(initialBlogs.length, blogsAfter.length - 1);
    assert(
      blogsAfter[blogsAfter.length - 1].title.includes(helper.newBlog.title)
    );
  });

  test.only("if blog likes is null set it to zero", async () => {
    const blogWithoutLikes = {
      title: "Without likes",
      author: "Anton",
      url: "http://withoutlikes.com",
    }

    const response = await api
      .post("/api/blogs")
      .send(blogWithoutLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/)
    
    assert.strictEqual(response.body.likes, 0)
  })
});

after(async () => {
  await mongoose.connection.close();
});
