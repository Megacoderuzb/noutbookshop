const path = require("path");
const multer = require("multer");
let date = Date.now();
console.log(date);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, date + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// const multer = require("multer");
// const fs = require("fs");
// const dir = "/public";   // PATH TO UPLOAD FILE
// if (!fs.existsSync(dir)) {  // CREATE DIRECTORY IF NOT FOUND
//   fs.mkdirSync(dir, { recursive: true });
// }
// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: fileStorageEngine });
// module.exports = upload;

module.exports = upload;
