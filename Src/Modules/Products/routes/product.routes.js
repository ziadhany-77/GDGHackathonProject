import { Router } from "express";
import { attachCoverImage } from "../middlewares/product.middlewares.js";
import { upload } from "../../../middlewares/uploade.middleware.js";
import { validate } from "../../../middlewares/validation.js";
import reviewRouter from "./review.routes.js";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProductWithImages,
} from "../controllers/product.controllers.js";
import {
  addProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "../validations/product.validation.js";

const router = Router();

router
  .route("/")
  .get(getProducts)
  .post(
    upload.fields([
      { name: "cover_image", maxCount: 1 },
      { name: "images", maxCount: 8 },
    ]),
    validate(addProductSchema),
    attachCoverImage(),
    addProduct
  );

router
  .route("/:productSlug")
  .get(validate(getProductSchema), getProduct)
  .delete(validate(deleteProductSchema), deleteProduct)
  .put(
    upload.fields([
      { name: "cover_image", maxCount: 1 },
      { name: "images", maxCount: 8 },
    ]),
    validate(updateProductSchema),
    attachCoverImage(),
    updateProductWithImages
  );

router.use("/:productSlug/reviews/", reviewRouter);

export default router;
