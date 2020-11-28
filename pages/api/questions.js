import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const questions = await db
    .collection("questions")
    .find({})
    .sort({ question: -1 })
    .limit(20)
    .toArray();

  res.json(questions);
};