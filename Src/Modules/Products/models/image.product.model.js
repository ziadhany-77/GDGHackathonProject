import mongoose from "mongoose";

const imageOnProductSchema = new mongoose.Schema({
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "image",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
});

imageOnProductSchema.pre(/find/i, function (next) {
  this.populate("imageId");
  next();
});

imageOnProductSchema.pre(/delete/i, async function (next) {
  const toBeDeletedProductImage = await imageOnProductModel.findOne(
    this._conditions
  );
  if (!toBeDeletedProductImage) return next();
  await mongoose
    .model("image")
    .findByIdAndDelete(toBeDeletedProductImage.imageId._id);
});

const imageOnProductModel = mongoose.model(
  "imageOnProduct",
  imageOnProductSchema
);

export default imageOnProductModel;
