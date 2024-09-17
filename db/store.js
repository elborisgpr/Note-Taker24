const fs = require('fs/promises');
const {v4: uuidv4} = require('uuid');


class Store {
    read() {
        return fs.readFile('db/db.json', 'utf8');
    };
    write(note) {
        return fs.writeFile('db/db.json', JSON.stringify(note));
    };

    getNotes() {
        return this.read()
            .then((notes) => {
                let getNotes;
                if (notes == null) {
                    getNotes = [];
                } else {
                    getNotes = [].concat(JSON.parse(notes));
                }
                return getNotes;
            });
    };

    addNotes(notes) {
        const {text, title} = notes;
        if (!text || !title) {
            return;
        };

        const addedNote = {
            text,
            title,
            id: uuidv4()
        };

        return this.getNotes()
            .then((notes) => {
                return [...notes, addedNote];
        })
            .then((updatedNote) => {
                this.write(updatedNote);
        })
            .then(() => addedNote);
    };

    removeNotes(id) {
        return this.getNotes
            .then((notes) => {
                return notes.filter((note) => note.id !== id)
            })
            .then((filtered) => this.write(filtered))
    }
}
module.exports = new Store();