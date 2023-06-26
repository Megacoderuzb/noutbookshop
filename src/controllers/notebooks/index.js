const { default: knex } = require("knex");
const { db } = require("../../db");
const { BadRequestErr } = require("../../shared/errors");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {knex} db
 */
const getNotebooks = async (req, res, next) => {
  try {
    const Notebooks = await db("notebooks").select(
      "id",
      "name",
      "price",
      "description"
    );
    return res.status(201).json({
      message: "success",
      data: Notebooks,
    });
  } catch (error) {
    console.log(error);
    // throw new BadRequestErr("Xatolik yuz berdi", error);
    res.status(503).json({
      status: 503,
      errMessage: `Serverda xato 
      ${error}`,
    });
  }
};
const showNotebooks = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const notebook = await db("notebooks").where({ id }).first();
    const notebook = await await db("notebooks")
      .leftJoin("brands", "brands.id", "notebooks.brand_id")
      .leftJoin("madels", "madels.id", "notebooks.madels_id")
      .leftJoin("categories", "categories.id", "notebooks.category_id")
      .leftJoin("pictures", "pictures.id", "notebooks.image_id")
      .select(
        "notebooks.id",
        "notebooks.name",
        "notebooks.brand_id",
        "notebooks.madels_id",
        "notebooks.category_id",
        "brands.brand_name",
        "notebooks.image_id",
        "pictures.img_url",
        "madels.name",
        "categories.category_name"
      )
      .where({ "notebooks.id": id })
      .groupBy(
        "notebooks.id",
        "categories.id",
        "brands.id",
        "madels.id",
        "pictures.id"
      )
      .first();
    if (!notebook) {
      res.status(400).json({
        error: `${id} - idli notebook yo'q`,
      });
    }
    return res.status(201).json({
      message: "success",
      data: notebook,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: "Notebook topilmadi !!!",
    });
  }
};
const patchNotebooks = async (req, res, next) => {
  try {
    const { ...changes } = req.body;
    const { id } = req.params;
    const existing = await db("notebooks").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id}-idli notebook yo'q`,
      });
    }

    const updated = await db("notebooks")
      .where({ id })
      .update({ ...changes })
      .returning(["id", "name", "madels_id"]);

    res.status(200).json({
      updated: updated[0],
    });
  } catch (error) {
    res.status(400).json({
      message: "Notebook o'zgarmadi !!!",
    });
  }
};
const postNotebooks = async (req, res, next) => {
  try {
    const { name, brand_id, madels_id, category_id, description, price } =
      req.body;
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
    const data = await db("notebooks")
      .insert({
        name: name,
        brand_id: brand_id,
        category_id: category_id,
        madels_id: madels_id,
        description: description,
        price: price,
        image_id: { image }.image[0].id,
      })
      .returning(["*"]);
    res.status(200).json({
      data: data[0],
    });
    // const notebook = await db("notebooks")
    //   .insert({
    //     name: name,
    //     brand_id: brand_id,
    //     madels_id: madels_id,
    //     category_id: category_id,
    //     image_id: image_id,
    //     description: description,
    //     price: price,
    //   })
    //   .returning(["*"]);

    res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Notebook qo'shilmadi !!!",
    });
  }
};
const deleteNotebooks = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await db("notebooks").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id}-idli notebook yo'q`,
      });
    }

    const del = await db("notebooks").where({ id }).returning(["*"]).del();

    res.status(200).json({
      deleted: del,
    });
  } catch (error) {
    res.status(400).json({
      message: "Notebook o'zgarmadi !!!",
    });
  }
};
module.exports = {
  getNotebooks,
  postNotebooks,
  showNotebooks,
  patchNotebooks,
  deleteNotebooks,
};
