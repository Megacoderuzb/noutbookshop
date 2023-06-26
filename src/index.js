const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");
const brandRoutes = require("./routes/brands");
const userRoutes = require("./routes/users");
const categoryRoutes = require("./routes/categories");
const madelRoutes = require("./routes/madels");
const notebookRoutes = require("./routes/notebooks");
const { db } = require("./db");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
env.config();
app.use(express.static(__dirname + "/public"));
app.use(express.json());
// app.use(express.urlencoded());

app.use(brandRoutes);
app.use(userRoutes);
app.use(categoryRoutes);
app.use(madelRoutes);
app.use(notebookRoutes);
app.get("/public/:filename", async (req, res) => {
  const { filename } = req.params;
  const data = await db
    .select("*")
    .from("pictures")
    .where({ filename })
    .first();
  console.log(data);
  res.send(data);
});

app.listen(process.env.port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
