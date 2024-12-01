import { Router } from "express";
import { attachImage } from "../../Image/middlewares/image.middlewares.js";
import { upload } from "../../../middlewares/uploade.middleware.js";
import { validate } from "../../../middlewares/validation.js";
import subcategoryRouter from "./subcategory.routes.js";
import {
  addCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from "../validations/category.validation.js";
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.controllers.js";

const router = Router();

router
  .route("/")
  .get(getCategories)
  .post(
    upload.single("image"),
    validate(addCategorySchema),
    attachImage("image"),
    addCategory
  );

router
  .route("/:categorySlug")
  .get(validate(getCategorySchema), getCategory)
  .put(
    upload.single("image"),
    validate(updateCategorySchema),
    attachImage("image"),
    updateCategory
  )
  .delete(validate(deleteCategorySchema), deleteCategory);

export default router;
