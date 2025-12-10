// schemas/docModel.js
const mongoose = require("mongoose");

const docModel = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      set: function (value) {
        if (typeof value !== "string") return value;
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    address: {
      type: String,
      required: [true, "Address required"],
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
    },
    // experience as Number is more logical but keep Number or String per your usage
    experience: {
      type: Number,
      required: [true, "Experience is required"],
    },
    fees: {
      type: Number,
      required: [true, "Fees is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    // timings as array of strings ["09:00", "17:00"]
    timings: {
      type: [String],
      required: [true, "Work time required"],
    },
  },
  {
    timestamps: true,
  }
);

const docSchema = mongoose.model("doctor", docModel);

module.exports = docSchema;
