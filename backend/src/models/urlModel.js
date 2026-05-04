import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    longUrl: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    
    clickCount: {
      type: Number,
      default: 0,
    },
  }
);

export default mongoose.model('Url', urlSchema);