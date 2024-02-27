import express from "express";

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World on port 5000!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
