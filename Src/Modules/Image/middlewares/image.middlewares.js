import { catchAsyncError } from "../../../utils/errorhandeling.js"
import { createImage } from "../utils/image.utils.js"


export const attachImage = (bodyFieldName) =>
    catchAsyncError(async (req, res, next) => {
        if (!req.file) return next()
        const image = await createImage(req.file.path)
        req.body[bodyFieldName] = image._id
        next()
})