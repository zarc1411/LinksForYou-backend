require("dotenv").config();

const express = require("express");

const app = express();
const cors = require("cors");
app.use(express.static("build"));
app.use(express.json());
app.use(cors());

const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

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

app.put(`/months/`, (request, response) => {
  const linkToAdd = request.body;
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
      response.status(200).end();
    })
    .catch((error) => next(error));
});

app.get(`/months/:month`, (request, response, next) => {
  Month.find({ monthName: `${request.params.month}` })
    .then((result) => {
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
app.listen(PORT, () => {});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  next(error);
};

app.use(errorHandler);
