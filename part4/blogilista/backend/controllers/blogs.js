const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (req, res) => {
  console.log(
    "route hit, mongoose readyState =",
    mongoose.connection.readyState
  );

  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

blogsRouter.post("/", (req, res) => {
  const blog = new Blog(req.body);

  console.log(req.body);
  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

module.exports = blogsRouter;
