const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => likes + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs) return null

  const maxLikes = Math.max(...blogs.map(blog => blog.likes))

  return blogs.find(blog => blog.likes === maxLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
