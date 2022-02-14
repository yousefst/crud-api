const express = require("express");
const DataBase = require("./database");
const cors = require("cors");
const app = express();
const db = new DataBase();

app.use(express.json());
app.use(cors());

//methodes
//post method
app.post("/notes", (req, res) => {
  db.connect().then(() => {
    let body = req.body;
    db.addNote(body)
      .then((data) => {
        res.send(data);
        db.disconnect();
      })
      .catch((err) => {
        res.status(500).send(err);
        db.disconnect();
      });
  });
});

//get method and search with title
app.get("/notes", (req, res) => {
  const { title } = req.query;
  if (title) {
    db.connect().then(() => {
      db.searchTitleNote(title)
        .then((temp) => {
          res.send(temp);
          db.disconnect();
        })
        .catch(() => {
          res.end();
          db.disconnect();
        });
    });
  } else {
    db.connect().then(() => {
      db.showNote()
        .then((temp) => {
          res.send(temp);
          db.disconnect();
        })
        .catch(() => {
          res.end();
          db.disconnect();
        });
    });
  }
});

//spicial note
app.get("/notes/:id", (req, res) => {
  let id = req.params.id;
  db.connect().then(() => {
    db.getSpicialNote(id)
      .then((temp) => {
        console.log("allah 3lek...");
        res.send(temp);
        db.disconnect();
      })
      .catch((err) => {
        res.send(err);
        db.disconnect();
      }); //need to review to check if it scure
  });
});

//update

app.put("/notes", (req, res) => {
  console.log("before connect ", req.body);
  db.connect().then(() => {
    let body = req.body;
    console.log("from req.body", req.body);
    db.update(body)
      .then((temp) => {
        console.log("form app dot ja is");
        res.send(temp);
        db.disconnect();
      })
      .catch(() => {
        console.log("updated fiel from app js");
        res.send("updated field");
        db.disconnect();
      });
  });
});

//delete
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  db.connect().then(() => {
    db.delete(id)
      .then((temp) => {
        res.send(temp);
        console.log("delted ");
        db.disconnect();
      })
      .catch((err) => {
        res.send(err);
        db.disconnect();
      });
  });
});

//need to know get or post //take parmeters or not
app.listen(3000, () => {
  console.log("express has been started sucessfully");
});
