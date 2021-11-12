import mongoose from "mongoose";

export const answerSchema = new mongoose.Schema({
  value: String,
  identifier: String,
});
