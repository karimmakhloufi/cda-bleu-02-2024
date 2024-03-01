import express from "express";
import sqlite3 from "sqlite3";
import { dataSource } from "./config/db";
import { Ad } from "./entities/ad";

const db = new sqlite3.Database("the_good_corner.sqlite");

// db.get("PRAGMA foreign_keys = ON");

const app = express();
app.use(express.json());
const port = 5000;

app.get("/", (_req, res) => {
  res.send("Hello World on port 5000!");
});

app.get("/ads", async (_req, res) => {
  try {
    const ads = await Ad.find();
    res.status(200).send(ads);
  } catch (err) {
    res.status(500).send("an error has occured");
  }
});

app.post("/ads", async (req, res) => {
  // console.log("req body", req.body);
  try {
    /*
    const ad = new Ad();
    ad.description = req.body.description;
    ad.owner = req.body.owner;
    ad.price = req.body.price;
    ad.title = req.body.title;
    ad.ville = req.body.location;
    await ad.save();
    */
    await Ad.save(req.body);
    res.send("Ad has been created");
  } catch (err) {
    console.log("error", err);
    res.status(500).send("an error has occured");
  }
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
    (_err, rows) => {
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

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Example app listening on port ${port}`);
});
