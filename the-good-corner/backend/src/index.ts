import express from "express";
import { ads } from "./data";

const app = express();
app.use(express.json());
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World on port 5000!");
});

app.get("/ads", (req, res) => {
  res.send(ads);
});

app.post("/ads", (req, res) => {
  console.log("req body", req.body);
  ads.push(req.body);
  console.log("test");
  res.send("Ad has been added");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
