const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger")

blogsRouter.get("/",async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
});

blogsRouter.post("/", (req, res, err) => {
  const blog = new Blog(req.body);

  console.log(req.body);
  blog
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => next(err));
});

module.exports = blogsRouter;
