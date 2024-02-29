import express from "express";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("the_good_corner.sqlite");

db.get("PRAGMA foreign_keys = ON");

const app = express();
app.use(express.json());
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World on port 5000!");
});

app.get("/ads", (req, res) => {
  db.all("SELECT * FROM ad", (err, rows) => {
    res.send(rows);
  });
});

app.post("/ads", (req, res) => {
  // console.log("req body", req.body);
  const stmt = db.prepare(
    "INSERT INTO ad (title, description, owner, price, ville, category_id ) VALUES (?,?,?,?,?,?)"
  );
  stmt.run(
    [
      req.body.title,
      req.body.description,
      req.body.owner,
      req.body.price,
      req.body.location,
      req.body.categoryId,
    ],
    (err) => {
      if (err) {
        console.log("error");
        res.status(500).send("An error has occured");
      } else {
        res.status(201).send("Ad has been added");
      }
    }
  );
});

app.delete("/ads/:idToDelete", (req, res) => {
  console.log("req params", req.params.idToDelete);
  const stmt = db.prepare("DELETE FROM ad WHERE id = ?");
  stmt.run([req.params.idToDelete]);
  res.send("Ad deleted");
});

app.put("/ads/:idToUpdate", (req, res) => {
  db.all(
    "SELECT * FROM ad WHERE id = ?",
    [req.params.idToUpdate],
    (err, rows) => {
      const originalAd = rows[0] as {
        title?: string;
        description?: string;
        owner?: string;
        price?: number;
        ville?: string;
      };
      console.log("original ad ", originalAd);
      const stmt = db.prepare(
        "UPDATE ad SET title = ?, description = ?, owner = ?, price = ?, ville = ? WHERE id = ?"
      );
      stmt.run([
        req.body.title ? req.body.title : originalAd.title,
        req.body.description ? req.body.description : originalAd.description,
        req.body.owner ? req.body.owner : originalAd.description,
        req.body.price ? req.body.price : originalAd.price,
        req.body.location ? req.body.location : originalAd.ville,
        req.params.idToUpdate,
      ]);
      res.send("Ad has been updated");
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
