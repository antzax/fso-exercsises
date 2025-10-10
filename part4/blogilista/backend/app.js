const express = require("express");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs")
const logger = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware")

const app = express();

const mongoUrl = config.MONGODB_URL;

logger.info("Connecting to database");

mongoose
  .connect(mongoUrl)
  .then(() => {
    logger.info("Connected to database");
  })
  .catch(() => {
    logger.error("Error connecting to database");
  });

// app.use(express.static('dist'))
app.use(express.json());
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;
