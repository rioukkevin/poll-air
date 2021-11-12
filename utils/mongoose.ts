import mongoose from "mongoose";

export const connect = async () => {
  await mongoose.connect("mongodb://localhost:27017", {
    auth: {
      username: "root",
      password: "root",
    },
  });
};

export const disconnect = async () => {
  await mongoose.disconnect();
};
