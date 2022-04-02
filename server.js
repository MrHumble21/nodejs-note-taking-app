// import essentials

const express = require("express");

const app = express();

const ejs = require("express");

const bodyParser = require("body-parser");

const data = require("./helper").data;

const category = require("./helper").category;

const date = require("./helper").date;
//mongoose

const { getBooks, setBooks } = require("./createAndDelete");
const mongoose = require("mongoose");
const MONGODB_URI = `mongodb+srv://Abdulboriy:zerotomastery@cluster0.mpywc.mongodb.net/NoteTakingAppDB`;
mongoose.connect(MONGODB_URI || "mongodb://localhost:27017/NoteTakingAppDB");

const db = "data.json";

const empty = [];

require("dotenv").config();

// serving public files
app.use(express.static("public"));

// connecting databases

const noteSchema = {
  dateCreated: String,
  createdBy: String,
  category: String,
  noteBody: String,
};

const Note = mongoose.model("Note", noteSchema);

// const databasename = "NoteTakingAppDB";

// middlewares

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

// routes
// var preFilled = null;
app.get("/", (req, res) => {
  Note.find({}, (err, foundNotes) => {
    res.render("main", { noteData: foundNotes, categories: category });
  });
});

app.post("/", (req, res) => {
  let dateCreated = req.body.date;
  let createdBy = req.body.author;
  let category = req.body.category;
  let noteBody = req.body.note;
  createdBy.toUpperCase()
  let dataNoteNew = { dateCreated, createdBy, category, noteBody };

  let addNote = new Note(dataNoteNew);
  addNote.save();

  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  Note.findByIdAndDelete(req.params.id, (err) => {
    if (!err) console.log("successfully deleted");
    res.redirect("/");
  });
});







app.get("/edit/:id", (req, res) => {
  Note.find({ _id: req.params.id }, (err, note) => {
    if (!err) {
      console.log(note)
      res.render("Update", { note: note , categories: category});
    } else {
      // console.table(err);
    }
  });
});

app.post("/edit/:id", (req, res) => {
  Note.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    (err, result) => {
      if (!err) {
       console.log(result)
       console.log(req.body)
       res.redirect('/')
        console.log("edited successfully !");
      } else {
        console.log(err);
      }
    }
  );
});


// sorting by categories:

app.get("/Educational", (req, res) => {
  console.log();
  Note.find({ category: `Educational ` }, (err, foundNotes) => {
    res.render("main", {
      noteData: foundNotes,
      categories: category,
    });
    // }
  });
});

app.get("/Work", (req, res) => {
  console.log();
  Note.find({ category: `Work ` }, (err, foundNotes) => {
    res.render("main", {
      noteData: foundNotes,
      categories: category,
    });
    // }
  });
});

app.get("/Home", (req, res) => {
  console.log();
  Note.find({ category: `Home ` }, (err, foundNotes) => {
    res.render("main", {
      noteData: foundNotes,
      categories: category,
    });
    // }
  });
});

app.get("/Others", (req, res) => {
  console.log();
  Note.find({ category: `Others ` }, (err, foundNotes) => {
    res.render("main", {
      noteData: foundNotes,
      categories: category,
    });
    // }
  });
});

app.get("/Educational", (req, res) => {
  console.log();
  Note.find({ category: `Educational ` }, (err, foundNotes) => {
    res.render("main", {
      noteData: foundNotes,
      categories: category,
    });
    // }
  });
});

app.post("/search", (req, res) => {
  Note.find({ createdBy: req.body["search"] }, (err, foundNotes) => {
    console.log(foundNotes);

    if (foundNotes.length === 0) {
      res.render("notfound", { noteData: foundNotes, categories: category });
    }
    res.render("main", {
      noteData: foundNotes,
      categories: category,
    });
    // }
  });
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
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is up and running on port ${port} 😊`);
});

// db.notes.find({_id:})
