const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const { title, likes, author, url} = req.body

  const newBlog = Blog({
    title,
    likes: likes || 0,
    author,
    url
  })

  const addedBlog = await newBlog.save();
  res.status(201).json(addedBlog);
});

module.exports = blogsRouter;
