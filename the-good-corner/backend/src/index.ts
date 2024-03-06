import cors from "cors";
import { validate } from "class-validator";
import express from "express";
import { dataSource } from "./config/db";
import { Ad } from "./entities/ad";
import { Category } from "./entities/category";
import { Tag } from "./entities/tag";

const app = express();
app.use(express.json());
app.use(cors());
const port = 5000;

app.get("/", (_req, res) => {
  res.send("Hello World on port 5000!");
});

app.get("/ads/:adId", async (req, res) => {
  try {
    const result = await Ad.findOneByOrFail({
      id: Number.parseInt(req.params.adId),
    });
    res.send(result);
  } catch (err) {
    console.log("error", err);
    res.send("an error has occured");
  }
});

app.get("/ads", async (_req, res) => {
  try {
    const ads = await Ad.find({ relations: { category: true, tags: true } });
    res.status(200).send(ads);
  } catch (err) {
    res.status(500).send("an error has occured");
  }
});

app.post("/ads", async (req, res) => {
  try {
    console.log("data from front form", req.body);
    const ad = Ad.create(req.body);
    // [1,2] -> [{id: 1}, {id: 2}]
    if (req.body.tags) {
      ad.tags = req.body.tags.map((el: number) => ({ id: el }));
    }
    const errors = await validate(ad);
    if (errors.length > 0) {
      console.log("validation errors", errors);
      throw new Error(`Validation failed!`);
    } else {
      await ad.save();
      res.send("Ad has been created");
    }
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
    await Ad.update({ id: parseInt(req.params.idToUpdate) }, req.body);
    res.send("ad updated");
  } catch (err) {
    console.log(err);
    res.send("an error has occured");
  }
});

app.get("/categories", async (_req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (err) {}
});

app.post("/categories", async (req, res) => {
  try {
    await Category.save(req.body);
    res.status(201).send("Category has been created");
  } catch (err) {
    console.log("error", err);
    res.status(500).send("an error has occured");
  }
});

app.post("/tags", async (req, res) => {
  try {
    await Tag.save(req.body);
    res.status(201).send("Tag has been created");
  } catch (err) {
    res.status(500).send("An error has occured");
  }
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Example app listening on port ${port}`);
});
