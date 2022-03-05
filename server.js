// import essentials

const express = require("express");

const app = express();

const ejs = require("express");

const bodyParser = require("body-parser");

const data = require("./helper").data;


const category = require("./helper").category;

//mongoose


const {getBooks, setBooks} = require("./createAndDelete");
const mongoose = require("mongoose");

const port = 3500;

const db = "data.json";


const empty = []

// serving public files
app.use(express.static("public"));


// connecting databases


mongoose.connect('mongodb://localhost:27017/NoteTakingAppDB')
const noteSchema = {
    dateCreated: String,
    createdBy: String,
    category: String,
    noteBody: String,
}

const Note = mongoose.model('Note', noteSchema)

const note1 = new Note({
    dateCreated: "Created Date",
    createdBy: "Created by",
    category: "Category",
    noteBody: "Main content",
})



const defaultNotes = [note1]


// middlewares

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

// routes

app.get("/", (req, res) => {

    Note.find({}, (err, foundNotes) => {

        if (foundNotes.length === 0) {
            Note.insertMany(defaultNotes, (err) => {
                if (err) console.log(err)
                else {
                    console.log('successful')
                }
                res.redirect('/')
            })
        } else {
            res.render("main", {noteData: foundNotes, categories: category});
        }

    })

});

app.post("/", (req, res) => {
    console.log(req.body.date);
    let dateCreated = req.body.date;
    let createdBy = req.body.author;
    let category = req.body.category;
    let noteBody = req.body.note;
    let dataNoteNew = {dateCreated, createdBy, category, noteBody};

    let addNote = new Note(dataNoteNew)

    addNote.save();

    // res.render("Create", {categories: category});

    res.redirect('/')
});

app.post('/delete',(req,res)=>{
const IDForDeleting =  req.body.delBtn
    Note.findByIdAndDelete(IDForDeleting,(err)=>{
        if(!err) console.log('successfully deleted')
        res.redirect('/')

    })
    if (defaultNotes.length === 0){
        res.redirect('/create')
    }
    console.log(IDForDeleting)
})

app.get("/create", (req, res) => {
    res.render("Create", {categories: category});
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


