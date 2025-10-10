const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger")

blogsRouter.get("/", (req, res, ext) => {
  Blog.find({})
    .then((blogs) => {
      res.json(blogs);
    })
    .catch((err) => next(err));
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
