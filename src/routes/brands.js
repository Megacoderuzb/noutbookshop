const express = require("express");
const genValidator = require("../shared/validator");
const { isLoggedIn, isAdmin } = require("../shared/auth");
const {
  postBrandschema,
  patchBrandschema,
} = require("../controllers/brands/schemas");
const brandsController = require("../controllers/brands");

const router = express.Router();

const mPostBrand = [isLoggedIn, isAdmin, genValidator(postBrandschema)];
const mGetBrands = [isLoggedIn];
const mShowBrands = [isLoggedIn];
const mPatchBrand = [isLoggedIn, isAdmin, genValidator(patchBrandschema)];
const mDeleteBrand = [isLoggedIn, isAdmin];

router.post("/Brands", mPostBrand, brandsController.postBrand);
router.get("/Brands", mGetBrands, brandsController.getBrands);
router.get("/Brands/:id", mShowBrands, brandsController.showBrand);
router.patch("/Brands/:id", mPatchBrand, brandsController.patchBrand);
router.delete("/Brands/:id", mDeleteBrand, brandsController.deleteBrand);
module.exports = router;
