import { ApiFeatures } from "../../../../Utils/apiFeatures.js";
import { catchAsyncError } from "../../../utils/errorhandeling.js";
import { createImage } from "../../Image/utils/image.utils.js";
import imageOnProductModel from "../models/image.product.model.js";
import productModel from "../models/product.model.js";

export const getProducts = catchAsyncError(async (req, res) => {
  const apiFeatures = new ApiFeatures(productModel.find(), req.query)
    .paginate(50)
    .fields()
    .filter()
    .search(["title", "description"])
    .sort();
  const products = await apiFeatures.query;
  res.json({ products });
});

export const getProduct = catchAsyncError(async (req, res) => {
  const product = await productModel.findOne({ slug: req.params.productSlug });
  res.json({ product });
});

export const deleteProduct = catchAsyncError(async (req, res) => {
  const product = await productModel.findOneAndDelete({
    slug: req.params.productSlug,
  });
  res.json({ product });
});

export const addProduct = catchAsyncError(async (req, res) => {
  const product = await productModel.create(req.body);
  if (req.files?.images)
    await Promise.all(
      req.files.images.map(async (file) => {
        try {
          const image = await createImage(file.path);
          await imageOnProductModel.create({
            imageId: image._id,
            productId: product._id,
          });
        } catch (error) {
          return next(error);
        }
      })
    );
  res.status(201).json({
    message: `product added with ${req.files.images?.length || 0} images`,
  });
});

export const updateProductWithImages = catchAsyncError(
  async (req, res, next) => {
    if (req.files?.images) {
      const product = productModel.findOne({ slug: req.params.productSlug });
      await Promise.all(
        product.images.map(async (image) => {
          try {
            await imageOnProductModel.findByIdAndDelete(image._id);
          } catch (error) {
            return next(error);
          }
        })
      );
      await Promise.all(
        req.files.images.map(async (file) => {
          try {
            const image = await createImage(file.path);
            await imageOnProductModel.create({
              imageId: image._id,
              productId: product._id,
            });
          } catch (error) {
            return next(error);
          }
        })
      );
    }
    await productModel.findOneAndUpdate(
      { slug: req.params.productSlug },
      req.body
    );
    res.json({
      message: `updated product with ${req.files.images?.length || 0} images`,
    });
  }
);
