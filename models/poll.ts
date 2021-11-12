import mongoose from "mongoose";
import { IPoll } from "../typings/poll";
import { answerSchema } from "./answer";

const pollSchema = new mongoose.Schema<IPoll>(
  {
    name: String,
    answers: [answerSchema],
    choices: [String],
    options: {
      isMultiple: Boolean,
      endDate: Date,
    },
  },
  { timestamps: true }
);

export const Poll =
  (mongoose.models.poll as mongoose.Model<IPoll, {}, {}, {}>) ||
  mongoose.model<IPoll>("poll", pollSchema);
