import multer from "multer";
import AppError from "../../utils/errorHandelling.js";

const storage = multer.diskStorage({});

function fileFilter(req, file, cb) {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(new AppError("wrong file", 400), false);
  }
}

export const upload = multer({ storage, fileFilter });
