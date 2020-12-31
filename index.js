require("dotenv").config();

const express = require("express");

const app = express();
const cors = require("cors");
app.use(express.static("build"));
app.use(express.json());
app.use(cors());
console.log("hello world");

const year = new Date().getFullYear();
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;
console.log(url);
console.log(typeof url);

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const linkSchema = new mongoose.Schema({
  tag: String,
  name: String,
  url: String,
});

const monthSchema = new mongoose.Schema({
  monthName: String,
  links: [linkSchema],
});

const Link = mongoose.model("Link", linkSchema);
const Month = mongoose.model("Month", monthSchema);

app.put(`/${year}/`, (request, response) => {
  const linkToAdd = request.body;
  console.log("This is the body", linkToAdd);
  const link = new Link({
    tag: linkToAdd.tag,
    name: linkToAdd.name,
    url: linkToAdd.url,
  });
  const monthWhereYouAdd = linkToAdd.month;
  Month.findOne({ monthName: `${monthWhereYouAdd}` })
    .then((result) => {
      const linksArray = result;
      linksArray.links.push(link);
      return linksArray.save();
    })
    .then((result) => {
      console.log(result);
      response.status(200).end();
    })
    .catch((error) => next(error));
});

app.get(`/${year}/:month`, (request, response, next) => {
  Month.find({ monthName: `${request.params.month}` })
    .then((result) => {
      console.log(result);
      if (result.length > 0) {
        response.json(result);
      } else response.status(304).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running on port 3001");
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  next(error);
};

app.use(errorHandler);
