const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const { test, after, beforeEach, describe } = require("node:test");
const app = require("../app");
const helper = require("../utils/blog_helper");
const api = supertest(app);
const Blog = require("../models/blog");

const blogUrl = "/api/blogs";

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("deleted blogs");
  await Blog.insertMany(helper.initialBlogs);
  console.log("added blogs");
});

describe("when there is notes in database", () => {
  test("blogs are returned as json", async () => {
    await api
      .get(blogUrl)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blogs have field id not __id", async () => {
    const blogs = await helper.blogsInDb();
    assert("id" in blogs[0]);
  });

  test("if blog likes is null set it to zero", async () => {
    const blogWithoutLikes = {
      title: "Without likes",
      author: "Anton",
      url: "http://withoutlikes.com",
    };

    const response = await api
      .post(blogUrl)
      .send(blogWithoutLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.likes, 0);
  });

  test("if blog has no title or url, should response with status 400", async () => {
    const blogWithoutTitle = {
      author: "Anton",
      url: "http://withouttitle.com",
    };

    const blogWithoutUrl = {
      title: "Without url",
      author: "Anton",
    };

    await api.post(blogUrl).send(blogWithoutTitle).expect(400);

    await api.post(blogUrl).send(blogWithoutUrl).expect(400);
  });

  test("blogs can be added", async () => {
    const initialBlogs = await helper.blogsInDb();

    await api
      .post(blogUrl)
      .send(helper.newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAfter = await helper.blogsInDb();

    assert.strictEqual(initialBlogs.length, blogsAfter.length - 1);
    assert(
      blogsAfter[blogsAfter.length - 1].title.includes(helper.newBlog.title)
    );
  });

  test("blogs can be deleted", async () => {
    const initialBlogs = await helper.blogsInDb();
    const id = initialBlogs[0].id;

    await api.delete(`${blogUrl}/${id}`).expect(204);

    const blogsAfter = await helper.blogsInDb();

    assert.strictEqual(blogsAfter.length, initialBlogs.length - 1);
  });

  test("blogs can be edited", async () => {
    const initialBlogs = await helper.blogsInDb();
    const id = initialBlogs[0].id;
    const likes = initialBlogs[0].likes + 1;

    await api
      .put(`${blogUrl}/${id}`)
      .send({ likes })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAfter = await helper.blogsInDb();

    assert.strictEqual(blogsAfter[0].likes, likes);
  });
});

after(async () => {
  await mongoose.connection.close();
});
