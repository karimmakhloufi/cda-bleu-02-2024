import "reflect-metadata";
import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolver";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./config/db";
import CategoryResolver from "./resolvers/CategoryResolver";
import TagResolver from "./resolvers/TagResolver";

// import cors from "cors";
// import { validate } from "class-validator";
// import express from "express";
// import { Ad } from "./entities/ad";
// import { Category } from "./entities/category";
// import { Tag } from "./entities/tag";
// import adController from "./controllers/adController";
// import { ILike } from "typeorm";

const start = async () => {
  console.log("hot reload is working ?");
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

start();

/*
const app = express();
app.use(express.json());
app.use(cors());
const port = 5000;

app.get("/", (_req, res) => {
  res.send("Hello World on port 5000!");
});

app.get("/ads/:adId", adController.getOneAdById);

app.get("/ads", async (_req, res) => {
  try {
    const ads = await Ad.find({ relations: { category: true, tags: true } });
    res.status(200).send(ads);
  } catch (err) {
    res.status(500).send("an error has occured");
  }
});

app.get("/search/ads/:keyword", async (req, res) => {
  try {
    const ads = await Ad.find({
      where: { title: ILike(`%${req.params.keyword}%`) },
    });
    res.send(ads);
  } catch (err) {
    res.status(500).send("An error has occured");
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

app.get("/tags", async (_req, res) => {
  try {
    const result = await Tag.find();
    res.send(result);
  } catch (err) {
    console.log("err", err);
  }
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Example app listening on port ${port}`);
});

*/
