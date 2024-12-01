import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "image",
    },
  },
  { timestamps: true }
);
categorySchema.pre(/find/, function (next) {
  this.populate("image", ["path"]);
  next();
});

categorySchema.pre(/delete/i, async function (next) {
  const CategoryWillBeDeleted = await categoryModel.findOne(this._conditions);
  if (!CategoryWillBeDeleted) return next();
  await mongoose.model("image").findByIdAndDelete(CategoryWillBeDeleted.image);

  next();
});

categorySchema.pre(/update/i, async function (next) {
  if (!this._update.image) return next();
  const CategoryWillBeUpdated = await categoryModel.findOne(this._conditions);
  if (!CategoryWillBeUpdated) return next();
  await mongoose.model("image").findByIdAndDelete(CategoryWillBeUpdated.image);
  next();
});

const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;
