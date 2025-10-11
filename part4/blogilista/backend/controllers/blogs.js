const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const { title, likes, author, url } = req.body;

  if (!title || !url) return res.status(400).end();

  const newBlog = Blog({
    title,
    likes: likes || 0,
    author,
    url,
  });

  const addedBlog = await newBlog.save();
  res.status(201).json(addedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).end();
  
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) return res.status(200).end();

  blog.likes = req.body.likes
  
  const updatedBlog = await blog.save()
  res.json(updatedBlog)
}) 

module.exports = blogsRouter;
