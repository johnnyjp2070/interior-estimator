const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const estimationsSchema = new mongoose.Schema({
  clientDetail: {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      sparse: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  packageType: {
    type: String,
  },
  uom: {
    kitchenandutilities: {
      kitchen: {
        type: Number,
      },
      accessories: {
        type: Number,
      },
      kitchenloft: {
        type: Number,
      },
      utility: {
        type: Number,
      },
    },
  },
});

module.exports = Estimations = mongoose.model("estimations", estimationsSchema);
