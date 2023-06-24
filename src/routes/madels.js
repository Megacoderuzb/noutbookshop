const express = require("express");
const genValidator = require("../shared/validator");
const { isLoggedIn, isAdmin } = require("../shared/auth");
const {
  postMadelschema,
  patchMadelschema,
} = require("../controllers/madels/schemas");
const madelsController = require("../controllers/madels");

const router = express.Router();

const mPostMadel = [isLoggedIn, isAdmin, genValidator(postMadelschema)];
const mGetMadels = [isLoggedIn];
const mShowMadels = [isLoggedIn];
const mPatchMadel = [isLoggedIn, isAdmin, genValidator(patchMadelschema)];
const mDeleteMadel = [isLoggedIn, isAdmin];

router.post("/madels", mPostMadel, madelsController.postMadel);
router.get("/madels", mGetMadels, madelsController.getMadels);
router.get("/madels/:id", mShowMadels, madelsController.showMadel);
router.patch("/madels/:id", mPatchMadel, madelsController.patchMadel);
router.delete("/madels/:id", mDeleteMadel, madelsController.deleteMadel);
module.exports = router;
