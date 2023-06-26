const express = require("express");
const genValidator = require("../shared/validator");
const { isLoggedIn, isAdmin } = require("../shared/auth");
const {
  postUsersSchema,
  patchUsersSchema,
  loginUsersSchema,
} = require("../controllers/users/schemas");
const usersController = require("../controllers/users");

const router = express.Router();

const mPostuser = [isLoggedIn, isAdmin, genValidator(postUsersSchema)];
const mGetusers = [isLoggedIn, isAdmin];
const mShowusers = [isLoggedIn];
const mPatchuser = [isLoggedIn, isAdmin, genValidator(patchUsersSchema)];
const mDeleteuser = [isLoggedIn, isAdmin];
const mLoginSchema = [genValidator(loginUsersSchema)];

router.post("/users", mPostuser, usersController.postUsers);
router.get("/users", mGetusers, usersController.getUsers);
router.get("/users/:id", mShowusers, usersController.showUsers);
router.post("/users/login", mLoginSchema, usersController.loginUsers);
router.patch("/users/:id", mPatchuser, usersController.patchUsers);
router.delete("/users/:id", mDeleteuser, usersController.deleteUsers);
module.exports = router;
