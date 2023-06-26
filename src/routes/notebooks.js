const express = require("express");
const genValidator = require("../shared/validator");
const { isLoggedIn, isAdmin } = require("../shared/auth");
const {
  postNotebooksSchema,
  patchNotebooksSchema,
} = require("../controllers/notebooks/schemas");
const notebooksController = require("../controllers/notebooks");
const upload = require("../uploads");

const router = express.Router();

const mPostNotebooks = [
  isLoggedIn,
  isAdmin,
  genValidator(postNotebooksSchema),
  upload.single("image"),
];
const mPatchNotebooks = [
  isLoggedIn,
  isAdmin,
  genValidator(patchNotebooksSchema),
  upload.single("image"),
];
const mDeleteNotebooks = [isLoggedIn, isAdmin];

router.post("/notebooks", mPostNotebooks, notebooksController.postNotebooks);
router.get("/notebooks", notebooksController.getNotebooks);
router.get("/notebooks/:id", notebooksController.showNotebooks);
router.patch(
  "/notebooks/:id",
  mPatchNotebooks,
  notebooksController.patchNotebooks
);
router.delete(
  "/notebooks/:id",
  mDeleteNotebooks,
  notebooksController.deleteNotebooks
);
module.exports = router;
