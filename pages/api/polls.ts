// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Poll } from "../../models/poll";
import { connect, disconnect } from "../../utils/mongoose";

type Data = {
  [key: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  connect();
  const polls = await Poll.find();
  res.status(200).json(polls);
  disconnect();
  return;
}
