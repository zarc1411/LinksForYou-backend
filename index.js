require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use(express.static("build"));
console.log("hello world");
const year = new Date().getFullYear();
const mongoose = require("mongoose");
const { request, response } = require("express");

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

app.post(`/${year}/`, (request, response) => {
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
    .catch((error) => console.log(error));
});

app.get(`/${year}/:month`, (request, response) => {
  Month.find({ monthName: `${request.params.month}` })
    .then((result) => {
      if (result.length) {
        console.log(result);
        response.json(result);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => response.status(500).end());
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running on port 3001");
});
