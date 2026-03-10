import mongoose from "mongoose";

export async function connectDb(mongoUri) {
  if (!mongoUri) throw new Error("mongodb+srv://anshurvlg_db_user:TLrgkt5wwESQUZMe@cluster0.8f7s8zn.mongodb.net/?appName=Cluster0");
  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri, {
    autoIndex: true
  });
}

