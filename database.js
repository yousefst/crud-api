const mongoose = require("mongoose");
const note = require("./schema");

class DATABASE {
  url = "mongodb://localhost:27017/notes";

  connect() {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(this.url)
        .then(() => {
          console.log("connected to database");
          resolve("connected successfully to database");
        })
        .catch((err) => {
          reject("connect to database feild");
        });
    });
  }
  disconnect() {
    console.log("database disconnected");
    mongoose.disconnect();
  }
  addNote(noteData) {
    noteData["createdData"] = new Date();
    noteData["updatedData"] = new Date();
    return new Promise((resolve, reject) => {
      let newNote = new note(noteData);
      //==let newNote=new note({title:noteData.title,content:noteData.content});
      newNote
        .save()
        .then((doc) => {
          console.log("added to database");
          resolve(doc);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  showNote() {
    return new Promise((resolve, reject) => {
      note
        .find()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getSpicialNote(id) {
    return new Promise((resolve, reject) => {
      note
        .find({ _id: id })
        .then((temp) => {
          console.log("100/100");
          resolve(temp);
        })
        .catch((err) => {
          reject("not match");
        });
    });
  }

  update(body) {
    return new Promise((resolve, reject) => {
      note
        .updateOne({ _id: body._id }, body)
        .then(() => {
          console.log("full el full");
          resolve("addend sucessfully");
        })
        .catch((err) => {
          console.log("fe 7aga 3'lat ", err);
          reject("laaaaaaaaa");
        });
    });
  }

  delete(noteId) {
    return new Promise((resolve, reject) => {
      note
        .deleteOne({ _id: noteId })
        .then(() => {
          resolve("deleted successfully");
        })
        .catch(() => {
          reject("deleted field");
          console.log("there is errors");
        });
    });
  }
  searchTitleNote(sTitle) {
    return new Promise((resolve, reject) => {
      const query = { title: { $regex: new RegExp(sTitle, "i") } };
      note
        .find(query)
        .then((resualt) => {
          resolve(resualt);
        })
        .catch(() => {
          reject("not found");
        });
    });
  }
}
module.exports = DATABASE;
