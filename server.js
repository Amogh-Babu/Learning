const express = require("express")
const ejs = require("ejs")
const mongoose = require("mongoose")
const Event = require('./models/event')

const app = express()

app.set('view engine', 'ejs')

const dbURL = "mongodb+srv://AmoghBabu2:hello@dev.yac7dyu.mongodb.net/?retryWrites=true&w=majority&appName=Dev";

mongoose
    .connect(dbURL)
    .then((result) => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Server started on port 3000");
        });
    })
    .catch((err) => {
        console.log("Could not connect to MongoDB:", err);
    })


app.post('/submit-event', (req, res) => {
    const event = new Event(req.body);
    event.save()
        .then((result) => {
            console.log(result);
            res.redirect('/');
        })
        .catch((err) => {
            console.error(err);
        });
});

app.get('/', (req, res) => {
    Event.find()
        .then((result) => {
            res.render('homepage', {title: 'All events', events: result })
        })
        .catch((err) => {
            console.error(err);
        })
})



