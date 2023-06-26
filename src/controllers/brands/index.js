const { default: knex } = require("knex");
const { db } = require("../../db");
const { BadRequestErr, NotFoundErr } = require("../../shared/errors");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {knex} db
 */
const getBrands = async (req, res, next) => {
  // console.log(db("brands"));
  try {
    const brands = await db("brands").select("id", "brand_name");
    return res.status(201).json({
      message: "success",
      data: brands,
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
const showBrands = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await await db("brands")
      .leftJoin("pictures", "pictures.id", "brands.image_id")
      .select(
        "brands.id",
        "brands.brand_name",
        "brands.image_id",
        "pictures.img_url"
      )
      .where({ "brands.id": id })
      .groupBy("brands.id", "pictures.id")
      .first();
    if (!brand) {
      res.status(400).json({
        error: `${id} - idli brand yo'q`,
      });
    }
    return res.status(201).json({
      message: "success",
      data: brand,
    });
    // const brand = await db("brands").where({ id }).first();
    // if (!brand) {
    //   res.status(400).json({
    //     error: `${id} - idli brand yo'q`,
    //   });
    // }
    // return res.status(201).json({
    //   message: "success",
    //   data: brand,
    // });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
    // throw new BadRequestErr("Xatolik yuz berdi", error);
  }
};
const patchBrands = async (req, res, next) => {
  try {
    const { ...changes } = req.body;
    const { id } = req.params;
    const existing = await db("brands").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id}-idli brand yo'q`,
      });
    }

    const updated = await db("brands")
      .where({ id })
      .update({ ...changes })
      .returning(["id", "brand_name"]);

    res.status(200).json({
      updated: updated[0],
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
};
const postBrands = async (req, res, next) => {
  try {
    const { filename } = req.file;
    const { brand_name } = req.body;
    console.log(brand_name);
    console.log(filename);
    const image = await db
      .insert({
        filename,
        img_url: `http://localhost:7070/public/${filename}`,
      })
      .into("pictures")
      .returning(["id", "img_url"]);
    // console.log({ image }.image[0].id);
    const brand = await db("brands")
      .insert({
        brand_name: brand_name,
        image_id: { image }.image[0].id,
      })
      .returning(["*"]);
    // .then(() => res.json({ success: true, filename }))
    // .catch((err) =>
    // res.json({ success: false, message: "upload failed", stack: err.stack })
    // );

    res.status(200).json({
      data: [brand[0], image],
    });
  } catch (error) {
    console.log(error);
    // throw new NotFoundErr("something went wrong");
    res.send(error);
  }
};
const deleteBrands = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await db("brands").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id}-idli brand yo'q`,
      });
    }

    const del = await db("brands").where({ id }).returning(["*"]).del();

    res.status(200).json({
      deleted: del,
    });
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
};
module.exports = {
  getBrands,
  postBrands,
  showBrands,
  patchBrands,
  deleteBrands,
};
