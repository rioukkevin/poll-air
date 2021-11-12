// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Poll } from "../../../models/poll";
import { IPoll } from "../../../typings/poll";
import { connect, disconnect } from "../../../utils/mongoose";

type Data = IPoll;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connect();
  const { uuid } = req.query;
  const existingPoll = await Poll.findById(uuid);
  if (existingPoll) res.status(200).json(existingPoll);
  else {
    res.status(404);
  }
  await disconnect();
  return;
}
