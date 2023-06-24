const express = require("express");
const genValidator = require("../shared/validator");
const { isLoggedIn, isAdmin } = require("../shared/auth");
const {
  postCategoriesSchema,
  patchCategoriesSchema,
} = require("../controllers/categories/schemas");
const CategoriesController = require("../controllers/categories");

const router = express.Router();

const mPostCategories = [
  isLoggedIn,
  isAdmin,
  genValidator(postCategoriesSchema),
];
const mGetCategories = [isLoggedIn];
const mShowCategories = [isLoggedIn];
const mPatchCategories = [
  isLoggedIn,
  isAdmin,
  genValidator(patchCategoriesSchema),
];
const mDeleteCategories = [isLoggedIn, isAdmin];

router.post(
  "/Categories",
  mPostCategories,
  CategoriesController.postCategories
);
router.get("/Categories", mGetCategories, CategoriesController.getCategories);
router.get(
  "/Categories/:id",
  mShowCategories,
  CategoriesController.showCategories
);
router.patch(
  "/Categories/:id",
  mPatchCategories,
  CategoriesController.patchCategories
);
router.delete(
  "/Categories/:id",
  mDeleteCategories,
  CategoriesController.deleteCategories
);
module.exports = router;
