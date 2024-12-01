import mongoose from "mongoose";
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 20,
      required: true,
      unique: true,
      trim: true,
    },
    logo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "image",
    },
  },
  { timestamps: true }
);

brandSchema.pre(/find/, function (next) {
  this.populate("logo", ["path"]);
  next();
});

brandSchema.pre(/update/i, async function (next) {
  if (!this._update.logo) return next();
  const brandWillBeUpdated = await brandModel.findOne(this._conditions);
  if (!brandWillBeUpdated) return next();
  await mongoose.model("image").findByIdAndDelete(brandWillBeUpdated.logo);
  next();
});

brandSchema.pre(/delete/i, async function (next) {
  const brandWillBeDeleted = await brandModel.findOne(this._conditions);
  if (!brandWillBeDeleted) return next();
  await mongoose.model("image").findByIdAndDelete(brandWillBeDeleted.logo);
  next();
});

const brandModel = mongoose.model("Brand", brandSchema);

export default brandModel;
