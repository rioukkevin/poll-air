// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Poll } from "../../../models/poll";
import { IPoll } from "../../../typings/poll";
import { connect, disconnect } from "../../../utils/mongoose";

type Data = IPoll;

interface IBody {
  name: string;
  choices: string[];
  options?: {
    isMultiple?: boolean;
    endDate?: Date;
  };
}
interface Request extends NextApiRequest {
  body: string;
}

export default async function handler(
  req: Request,
  res: NextApiResponse<Data>
) {
  // DB
  await connect();
  // @ts-ignore
  const { name, choices, options } = JSON.parse(req.body) as IBody;
  const createdPoll = await Poll.create({
    name,
    choices,
    options,
    answers: [],
  });
  res.status(200).json(createdPoll);
  await disconnect();
  return;
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
