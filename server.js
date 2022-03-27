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
const MONGODB_URI = `mongodb+srv://aaa153599:@mrhumble.dd71i.mongodb.net/NoteTakingAppDB`;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/NoteTakingAppDB"
);

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

const note1 = new Note({
  dateCreated: "Created Date",
  createdBy: "Created by",
  category: "Category",
  noteBody: "Main content",
});

const defaultNotes = [note1];

// const databasename = "NoteTakingAppDB";

// middlewares

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

// routes
// var preFilled = null;
app.get("/", (req, res) => {
  Note.find({}, (err, foundNotes) => {
    if (foundNotes.length === 0) {
      Note.insertMany(defaultNotes, (err) => {
        if (err) console.log(err);
        else {
          console.log("successful");
        }
        res.redirect("/");
      });
    } else {
      res.render("main", {
        noteData: foundNotes,
        categories: category,
      });
    }
  });
});

app.post("/", (req, res) => {
  let dateCreated = req.body.date;
  let createdBy = req.body.author;
  let category = req.body.category;
  let noteBody = req.body.note;
  let dataNoteNew = { dateCreated, createdBy, category, noteBody };

  let addNote = new Note(dataNoteNew);
  addNote.save();

  // res.render("Create", {categories: category});

  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const IDForDeleting = req.body.delBtn;
  Note.findByIdAndDelete(IDForDeleting, (err) => {
    if (!err) console.log("successfully deleted");
    res.redirect("/");
  });
  if (defaultNotes.length === 0) {
    res.redirect("/create");
  }
});

let authorVerification = "";

app.post("/edit", async (req, res) => {
  authorVerification = Object.keys(req.body);

  Note.find({ createdBy: authorVerification[0] }, (err, foundNote) => {
    if (!err) {
      console.log("there is no error");
    } else {
      console.log(err);
    }
  });

  // collection.find({ "createdBy": "Zebokhon" })
  //     .toArray().then((ans) => {
  //         console.log(ans);
  //     });

  res.render("Edit", { categories: category });
});

app.post("/update", (req, res) => {
  console.log(req.body);

  Note.findOneAndUpdate(
    { createdBy: authorVerification[0] },
    { $set: req.body },
    (err, result) => {
      if (!err) {
        console.log("edited successfully !");
      } else {
        console.log(err);
      }
    }
  );

  res.redirect("/");
});

// getting rid of favicon
app.use(ignoreFavicon);

function ignoreFavicon(req, res, next) {
  if (req.originalUrl.includes("favicon.ico")) {
    res.status(204).end();
  }
  next();
}

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
