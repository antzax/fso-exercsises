const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => likes + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs) return null;

  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));

  return blogs.find((blog) => blog.likes === maxLikes);
};

const mostBlogs = (blogs) => {
  if (!blogs) return null;

  const authors = _.groupBy(blogs, "author");
  const counts = _.map(authors, (value, key) => ({
    author: key,
    blogs: value.length,
  }));

  return _.maxBy(counts, "blogs");
};

const mostLikes = (blogs) => {
  if (!blogs) return null;

  const authors = _.groupBy(blogs, "author")
  const likes = _.map(authors, (value, key) => ({
    author: key,
    likes: _.sumBy(value, "likes")
  }))

  console.log(likes)

  return _.maxBy(likes, "likes")
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
