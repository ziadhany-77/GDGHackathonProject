import { catchAsyncError } from "../../../utils/errorhandeling.js";
import { createImage } from "../../Image/utils/image.utils.js";

export const attachCoverImage = () =>
  catchAsyncError(async (req, res, next) => {
    if (!req.files?.cover_image) return next();
    const image = await createImage(req.files.cover_image[0].path);
    req.body.coverImage = image._id;
    next();
  });
