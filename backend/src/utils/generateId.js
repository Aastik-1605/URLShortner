import Counter from "../models/counterModel.js";

const generateNextSequece = async (name) => {
  const counter = await Counter.findOneAndUpdate(
    { name },
    { $inc: { seq: 1 } },
    { returnDocument: "after", upsert: true },
  )
  return counter.seq;
};

export default generateNextSequece;