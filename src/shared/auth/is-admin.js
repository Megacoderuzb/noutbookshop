const { BadRequestErr } = require("../errors");

const isAdmin = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "admin") {
      return res.status(403).json({
        error: "Ruxsat berilmagan.",
      });
    }
  } catch (error) {
    throw new BadRequestErr("Unauthorized! Ruxsat berilmagan!", error);
  }
};

module.exports = isAdmin;
