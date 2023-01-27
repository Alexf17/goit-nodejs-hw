const { User } = require("../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../public/avatars");

const updateAvatar = async (req, res, next) => {
  const { originalname } = req.file;
  const { _id } = req.user;
  const tempUpload = path.resolve(__dirname, "../tmp", originalname);
  const imageName = `${_id}_${originalname}`;
  try {
    const resultOfUpload = path.join(avatarDir, imageName);
    await Jimp.read(tempUpload)
      .then((image) => {
        return image.resize(250, 250).write(resultOfUpload);
      })
      .catch((err) => {
        throw err;
      });
    await fs.rename(tempUpload, resultOfUpload);
  } catch (err) {
    await fs.unlink(tempUpload);
    console.error(err);
    // throw err;
  }
  const avatarURL = path.join("public", "avatars", imageName);
  await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
  res.status(200).json({ avatarURL });
};

module.exports = { updateAvatar };
