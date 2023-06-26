const express = require("express");
const genValidator = require("../shared/validator");
const { isLoggedIn, isAdmin } = require("../shared/auth");
const {
  postCategoriesSchema,
  patchCategoriesSchema,
} = require("../controllers/categories/schemas");
const CategoriesController = require("../controllers/categories");
const upload = require("../uploads");
// const { up } = require("../../migrations/20230624120114_categories");

const router = express.Router();

const mPostCategories = [
  isLoggedIn,
  isAdmin,
  genValidator(postCategoriesSchema),
  upload.single("image"),
];
const mGetCategories = [isLoggedIn];
const mShowCategories = [isLoggedIn];
const mPatchCategories = [
  isLoggedIn,
  isAdmin,
  genValidator(patchCategoriesSchema),
  upload.single("image"),
];
const mDeleteCategories = [isLoggedIn, isAdmin];

router.post(
  "/categories",
  mPostCategories,
  CategoriesController.postCategories
);
router.get("/categories", CategoriesController.getCategories);
router.get("/categories/:id", CategoriesController.showCategories);
router.patch(
  "/categories/:id",
  mPatchCategories,
  CategoriesController.patchCategories
);
router.delete(
  "/categories/:id",
  mDeleteCategories,
  CategoriesController.deleteCategories
);
module.exports = router;
