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
  res.render("main", { noteData: getBooks(db), categories: category });
});

app.post("/", (req, res) => {
  console.log(req.body.date);
  let dateCreated = req.body.date;
  let createdBy = req.body.author;
  let category = req.body.category;
  let noteBody = req.body.note;
  let id = `${createdBy}${Math.random()*15}`
  let dataNoteNew = { dateCreated, createdBy, category, noteBody, id  };
  const notedata1 = getBooks(db)
  notedata1.push(dataNoteNew)
  console.log(notedata1)
  setBooks(db, notedata1)
  console.log(notedata1)

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


