import express from "express";
import { dataSource } from "./config/db";
import { Ad } from "./entities/ad";

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

app.delete("/ads/:idToDelete", async (req, res) => {
  try {
    await Ad.delete(req.params.idToDelete);
    res.send("Ad deleted");
  } catch (err) {
    console.log("error", err);
    res.send("an error has occured");
  }
});

app.put("/ads/:idToUpdate", async (req, res) => {
  try {
    /*
    const adToUpdate = await Ad.findOneByOrFail({
      id: Number.parseInt(req.params.idToUpdate),
    });
    console.log("adToUpdate", adToUpdate);
    if (req.body.title) {
      adToUpdate.title = req.body.title;
    }
    await adToUpdate.save();
    */
    await Ad.update({ id: parseInt(req.params.idToUpdate) }, req.body);
    res.send("ad updated");
  } catch (err) {
    console.log(err);
    res.send("an error has occured");
  }
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Example app listening on port ${port}`);
});
