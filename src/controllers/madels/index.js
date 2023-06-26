const { default: knex } = require("knex");
const { db } = require("../../db");
const { BadRequestErr } = require("../../shared/errors");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {knex} db
 */
const getMadels = async (req, res, next) => {
  try {
    const Madels = await db("madels").select("id", "name");
    return res.status(201).json({
      message: "success",
      data: Madels,
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
const showMadels = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const madel = await db("madels").where({ id }).first();
    // if (!madel) {
    //   res.status(400).json({
    //     error: `${id} - idli madel yo'q`,
    //   });
    // }
    const madel = await await db("madels")
      .leftJoin("pictures", "pictures.id", "madels.image_id")
      .select("madels.id", "madels.name", "madels.image_id", "pictures.img_url")
      .where({ "madels.id": id })
      .groupBy("madels.id", "pictures.id")
      .first();
    if (!madel) {
      res.status(400).json({
        error: `${id} - idli madel yo'q`,
      });
    }
    return res.status(201).json({
      message: "success",
      data: madel,
    });
  } catch (error) {
    res.status(503).json({
      status: 503,
      errMessage: `Serverda xato ${error}`,
    });
    // throw new BadRequestErr("Xatolik yuz berdi", error);
  }
};
const patchMadels = async (req, res, next) => {
  try {
    const { ...changes } = req.body;
    const { id } = req.params;
    const existing = await db("madels").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id}-idli madel yo'q`,
      });
    }

    const updated = await db("madels")
      .where({ id })
      .update({ ...changes })
      .returning(["id", "name"]);

    res.status(200).json({
      updated: updated[0],
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: `Xatolik! ${error}`,
    });
  }
};
const postMadels = async (req, res, next) => {
  try {
    // const madel = await db("madels").insert({ name: name }).returning(["*"]);
    // const { brand_name } = req.body;
    const { name } = req.body;
    const { filename } = req.file;
    console.log(name);
    console.log(filename);
    const image = await db
      .insert({
        filename,
        img_url: `http://localhost:7070/public/${filename}`,
      })
      .into("pictures")
      .returning(["id", "img_url"]);
    // console.log({ image }.image[0].id);
    const madel = await db("madels")
      .insert({
        name: name,
        image_id: { image }.image[0].id,
      })
      .returning(["*"]);
    res.status(200).json({
      data: madel[0],
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: `Xatolik! ${error}`,
    });
  }
};
const deleteMadels = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await db("madels").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id}-idli madel yo'q`,
      });
    }

    const del = await db("madels").where({ id }).returning(["*"]).del();

    res.status(200).json({
      deleted: del,
    });
  } catch (error) {}
};
module.exports = {
  getMadels,
  postMadels,
  showMadels,
  patchMadels,
  deleteMadels,
};
