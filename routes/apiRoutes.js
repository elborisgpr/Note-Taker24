const express = require('express');
const router = express.Router();
const store = require('../db/store')


router.get('/notes', (req, res) => {
    store.getNotes()
        .then((notes) => {
            console.log(notes);
            return res.json(notes);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
})

router.post('/notes', (req, res) => {
    store.addNotes(req.body)
        .then((note) => {
            return res.json(note);
        })
})

router.delete('/notes/:id', (req, res) => {
    store.removeNotes(req.params.id)
        .then(() => res.json({
            ok: true
        }))
})

module.exports = router;