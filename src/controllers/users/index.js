const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { db } = require("../../db");
const config = require("../../shared/config");
const { BadRequestErr } = require("../../shared/errors");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const postUsers = async (req, res) => {
  try {
    const { full_name, username, role, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db("users")
      .insert({
        full_name,
        username,
        role,
        password: hashedPassword,
      })
      .returning("*");

    res.status(201).json({
      user: result[0],
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/**
 * Get list of Users
 * 1. Login qilgan hamma xodimlar ko'ra olishi mumkin
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getUsers = async (req, res) => {
  try {
    const { role, q } = req.query;
    const dbQuery = db("users").select("id", "full_name", "username", "role");

    if (role) {
      dbQuery.where({ role });
    }
    if (q) {
      dbQuery
        .andWhereILike("username", `%${q}%`)
        .orWhereILike("full_name", `%${q}%`);
    }

    const Users = await dbQuery;

    res.status(200).json({
      Users,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const showUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const Users = await db("users")
      .select("id", "full_name", "username", "role")
      .where({ id })
      .first();

    if (!Users) {
      return res.status(404).json({
        error: "user topilmadi.",
      });
    }

    res.status(200).json({
      Users,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
// const loginUsers = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const existing = await db("users")
//       .where({ username })
//       .select("username", "password_hash", "role")
//       .first();

//     if (!existing) {
//       return res.status(401).json({
//         error: `username yoki password xato.`,
//       });
//     }
//     console.log(existing);

//     const match = await bcrypt.compare(password, existing.password_hash);

//     console.log(match);
//     if (!match) {
//       return res.status(401).json({
//         error: "username yoki password xato.",
//       });
//     }

//     const token = jwt.sign(
//       { id: existing.id, role: existing.role },
//       config.jwtSecret,
//       {
//         expiresIn: "1d",
//       }
//     );
//     return res.status(200).json({
//       token,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({
//       message: `Xatolik ${error}`,
//     });
//   }
// };
const loginUsers = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existing = await db("users")
      .where({ username })
      .select("id", "password_hash", "role")
      .first();
    if (!existing) {
      return res.status(401).json({
        error: "Username yoki password xato.",
      });
    }
    const match = await bcrypt.compare(password, existing.password_hash);
    if (!match) {
      return res.status(401).json({
        error: "Username yoki password xato.",
      });
    }
    const token = jwt.sign(
      { id: existing.id, role: existing.role },
      config.jwtSecret,
      {
        expiresIn: "1d",
      }
    );
    console.log(token);
    // return res.status(200).json({
    //   token,
    // });
    return;
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

// const loginUsers = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const existing = await db("users")
//       .where({ username })
//       .select("id", "password_hash", "role")
//       .first();

//     if (!existing) {
//       res.status(401).json({
//         error: "Username yoki password xato.",
//       });
//     }

//     const match = await bcrypt.compare(password, existing.password_hash);

//     if (!match) {
//       res.status(401).json({
//         error: "Username yoki password xato.",
//       });
//     }

//     const token = jwt.sign(
//       { id: existing.id, role: existing.role },
//       config.jwtSecret,
//       {
//         expiresIn: "1d",
//       }
//     );

//     res.status(200).json({
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };

const patchUsers = async (req, res) => {
  try {
    const { ...changes } = req.body;
    const { id } = req.params;

    const existing = await db("users").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} idli user topilmadi.`,
      });
    }

    if (changes.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(changes.password, salt);
      changes.password = hashedPassword;
    }

    const updated = await db("users")
      .where({ id })
      .update({ ...changes })
      .returning(["id", "full_name", "username", "role"]);
    if (updated) {
      res.status(200).json({
        updated: updated[0],
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteUsers = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await db("users").where({ id }).first();

    if (!existing) {
      return res.status(404).json({
        error: `${id} idli xodim topilmadi.`,
      });
    }

    const deleted = await db("users")
      .where({ id })
      .delete()
      .returning(["id", "full_name", "username", "role"]);

    res.status(200).json({
      deleted: deleted[0],
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

module.exports = {
  postUsers,
  getUsers,
  showUsers,
  loginUsers,
  patchUsers,
  deleteUsers,
};
