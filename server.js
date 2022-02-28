// import essentials

const express = require("express");

const app = express();

const ejs = require("express");

const bodyParser = require("body-parser");

const data = require("./helper").data;

const category = require("./helper").category;

const { getBooks, setBooks } = require("./createAndDelete");

const port = 3500;

const db = "data.json";

const empty = []

// serving public files
app.use(express.static("public"));

// middlewares

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

// routes

app.get("/", (req, res) => {
  let data1 = getBooks(db);
  console.log(data1);

  res.render("main", { noteData: data1, categories: category });
});

app.post("/", (req, res) => {
  console.log(req.body.date);
  let dateCreated = req.body.date;
  let createdBy = req.body.author;
  let category = req.body.category;
  let noteBody = req.body.note;
  let dataNoteNew = { dateCreated, createdBy, category, noteBody };
  console.log(dataNoteNew)
  const [...data] = getBooks(db);
  data.push(dataNoteNew)
  setBooks(db, [data])
  res.render("Create", { categories: category });


});

app.get("/create", (req, res) => {
  res.render("Create", { categories: category });
});

app.get("/admin", (req, res) => {
  res.send("<h1>hello from admin page</h1>");
});

app.get("/check", (req, res) => {
  res.send("<h1>hello from check page</h1>");
});

// starting server

app.listen(port, () => {
  console.log(`server is up and running on port ${port} 😊`);
});
