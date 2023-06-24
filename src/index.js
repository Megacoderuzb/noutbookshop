const express = require("express");
const env = require("dotenv");

env.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.listen(process.env.port, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
