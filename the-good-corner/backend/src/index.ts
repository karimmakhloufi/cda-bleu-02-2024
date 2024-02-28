import express from "express";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("the_good_corner.sqlite");

let ads = [
  {
    id: 1,
    title: "Bike to sell",
    description:
      "My bike is blue, working fine. I'm selling it because I've got a new one",
    owner: "bike.seller@gmail.com",
    price: 100,
    picture:
      "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
    location: "Paris",
    createdAt: "2023-09-05T10:13:14.755Z",
  },
  {
    id: 2,
    title: "Car to sell",
    description:
      "My car is blue, working fine. I'm selling it because I've got a new one",
    owner: "car.seller@gmail.com",
    price: 10000,
    picture:
      "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
    location: "Paris",
    createdAt: "2023-10-05T10:14:15.922Z",
  },
];

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
  console.log("req body", req.body);
  const stmt = db.prepare(
    "INSERT INTO ad (title, description, owner, price, ville ) VALUES (?,?,?,?,?)"
  );
  stmt.run([
    req.body.title,
    req.body.description,
    req.body.owner,
    req.body.price,
    req.body.location,
  ]);
  res.send("Ad has been added");
});

app.delete("/ads/:idToDelete", (req, res) => {
  console.log("req params", req.params.idToDelete);
  const stmt = db.prepare("DELETE FROM ad WHERE id = ?");
  stmt.run([req.params.idToDelete]);
  res.send("Ad deleted");
});

app.put("/ads/:idToUpdate", (req, res) => {
  ads = ads.map((ad) => {
    if (ad.id === Number.parseInt(req.params.idToUpdate)) {
      return req.body;
    } else {
      return ad;
    }
  });
  res.send("Ad has been updated");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
