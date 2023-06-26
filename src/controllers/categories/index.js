const { default: knex } = require("knex");
const { db } = require("../../db");
const { BadRequestErr, NotFoundErr } = require("../../shared/errors");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {knex} db
 */
const getCategories = async (req, res, next) => {
  // console.log(db("categories"));
  try {
    const Categories = await db("categories").select("id", "name");
    return res.status(201).json({
      message: "success",
      data: Categories,
    });
  } catch (error) {
    console.log(error);
    // throw new BadRequestErr("Xatolik yuz berdi", error);
    res.status(503).json({
      status: 503,
      errMessage: `Serverda xato ${error}`,
    });
  }
};
const showCategories = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await db("categories").where({ id }).first();
    if (!category) {
      res.status(400).json({
        error: `${id} - idli category yo'q`,
      });
    }
    return res.status(201).json({
      message: "success",
      data: category,
    });
  } catch (error) {
    throw new BadRequestErr("Xatolik yuz berdi", error);
  }
};
const patchCategories = async (req, res, next) => {
  try {
    const { ...changes } = req.body;
    const { id } = req.params;
    const existing = await db("categories").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id}-idli category yo'q`,
      });
    }

    const updated = await db("categories")
      .where({ id })
      .update({ ...changes })
      .returning(["id", "category_name"]);

    res.status(200).json({
      updated: updated[0],
    });
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      message: `Xatolik! ${error}`,
    });
    // throw new NotFoundErr("notogri ma`lumot");
  }
};
const postCategories = async (req, res, next) => {
  try {
    const { category_name } = req.body;
    const category = await db("categories")
      .insert({
        category_name: category_name,
      })
      .returning(["*"]);

    res.status(200).json({
      data: category[0],
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
const deleteCategories = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await db("categories").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id}-idli category yo'q`,
      });
    }

    const del = await db("categories").where({ id }).returning(["*"]).del();

    res.status(200).json({
      deleted: del,
    });
  } catch (error) {}
};
module.exports = {
  getCategories,
  postCategories,
  showCategories,
  patchCategories,
  deleteCategories,
};
