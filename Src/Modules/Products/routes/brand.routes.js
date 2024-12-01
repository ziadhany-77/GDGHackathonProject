import { Router } from "express";
import { addBrand, deleteBrand, getBrand, getBrands, updateBrand } from "../controllers/barnd.controllers.js";
import { upload } from "../../../middlewares/uploade.middleware.js";
import { validate } from "../../../middlewares/validation.js";
import { addBrandSchema, deleteBrandSchema, getBrandSchema, updateBrandSchema } from "../validations/brand.validation.js";
import { attachImage } from "../../Image/middlewares/image.middlewares.js";



const router = Router()



router.route('/')
    .get(getBrands)
    .post(
        upload.single('logo'),
        validate(addBrandSchema),
        attachImage('logo'),
        addBrand
    )


router.route('/:brandSlug')
    .get(
        validate(getBrandSchema),
        getBrand
    )
    .put(
        upload.single('logo'),
        validate(updateBrandSchema),
        attachImage('logo'),
        updateBrand
    )
    .delete(validate(deleteBrandSchema), deleteBrand)


export default router