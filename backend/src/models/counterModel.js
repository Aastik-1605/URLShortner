import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  seq: {
    type: Number,
    defaullt: 0,
  },
});

export default mongoose.model("Counter", counterSchema);
