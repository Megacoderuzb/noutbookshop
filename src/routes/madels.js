const express = require("express");
const genValidator = require("../shared/validator");
const { isLoggedIn, isAdmin } = require("../shared/auth");
const {
  postMadelschema,
  patchMadelschema,
} = require("../controllers/madels/schemas");
const madelsController = require("../controllers/madels");
const upload = require("../uploads");
const router = express.Router();

const mPostMadel = [
  isLoggedIn,
  isAdmin,
  genValidator(postMadelschema),
  upload.single("image"),
];
// const mGetMadels = [isLoggedIn];
// const mShowMadels = [isLoggedIn];
const mPatchMadel = [
  isLoggedIn,
  isAdmin,
  genValidator(patchMadelschema),
  upload.single("image"),
];
const mDeleteMadel = [isLoggedIn, isAdmin];

router.post("/madels", mPostMadel, madelsController.postMadels);
router.get("/madels", madelsController.getMadels);
router.get("/madels/:id", madelsController.showMadels);
router.patch("/madels/:id", mPatchMadel, madelsController.patchMadels);
router.delete("/madels/:id", mDeleteMadel, madelsController.deleteMadels);
module.exports = router;
