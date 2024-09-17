const express = require('express')
const path = require('path')

const fs = require('fs')
const fsPromises = require('fs').promises

const db = require('./db/db.json')
const uuid = require('./helpers/uuid')
const { error } = require('console')

const PORT = process.env.PORT || 3001;
const app = express();
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))

});

app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {

 fsPromises.readFile('./db/db.json', "utf8", (err, data) => data)
    .then((data) => res.json(JSON.parse(data))
)
});

app.post('/api/notes', (req, res) => {
    const {title, text} = req.body

    if (req.body && title && text){
       
       const newNote = {
        title,
        text,
        id: uuid()
       }

       fsPromises.readFile(`./db/db.json`, "utf8", (err, data) =>{
            err
                ? console.log(err)
                : console.log(data)
    }).then((Db) => {
 
       let newDb = (JSON.parse(Db))

       newDb.push(newNote)
       console.log(newDb)

    const stringifiedDb = JSON.stringify(newDb)
    console.log(stringifiedDb)

       fs.writeFile(`./db/db.json`, stringifiedDb,(err) => {
            err
                ? console.log(error)
                : console.log(
                    `SERVER: SUCCESS! Task for "${newNote.title} has been written to JSON"`
                )
       })

       let response = {
            status: "Success",
            body: newDb
       }    

 
       res.json(response)
    })
    } else {

        res.json('client:ERROR Request body must at least contain a title')
    }
})
             
app.listen(PORT, () => 
    console.log(`App listening on port ${PORT}`))