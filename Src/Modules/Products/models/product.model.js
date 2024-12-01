import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 3,
    maxLength: 200,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    minLength: 3,
    maxLength: 10000,
    required: true,
    trim: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Brand",
  },
  stock: {
    type: Number,
    min: 0,
    required: true,
  },
  price: {
    type: Number,
    min: 0.01,
    required: true,
  },
  cover_image: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "image",
  },
  features: [
    {
      key: String,
      value: String,
    },
  ],
});

productSchema.pre(/find/i, function (next) {
  this.populate("coverImage");
  this.populate("subcategory_id");
  next();
});

productSchema.virtual("images", {
  ref: "imageOnProduct",
  localField: "_id",
  foreignField: "productId",
});

productSchema.pre(/^find/i, function (next) {
  this.populate("images", ["-productId", "imageId"]);
  next();
});

productSchema.pre(/delete/i, async function (next) {
  const productWillBeDeleted = await productModel.findOne(this._conditions);
  if (!productWillBeDeleted) return next();
  await mongoose
    .model("image")
    .findByIdAndDelete(productWillBeDeleted.coverImage);
  await Promise.all(
    productWillBeDeleted.images.map(async (image) => {
      await mongoose.model("imageOnProduct").findByIdAndDelete(image._id);
    })
  );
  next();
});

productSchema.pre(/update/i, async function (next) {
  if (!this._update.coverImage) return next();
  const toBeUpdatedProduct = await productModel.findOne(this._conditions);
  if (!toBeUpdatedProduct) return next();

  await mongoose
    .model("image")
    .findByIdAndDelete(toBeUpdatedProduct.coverImage);
  next();
});

const productModel = mongoose.model("Product", productSchema);
export default productModel;
