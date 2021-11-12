// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Poll } from "../../models/poll";
import { IPoll } from "../../typings/poll";
import { connect, disconnect } from "../../utils/mongoose";

type Data = IPoll | null;

interface Request extends NextApiRequest {
  body: {
    choice: string;
    pollId: string;
    identifier: string;
  };
}

export default async function handler(
  req: Request,
  res: NextApiResponse<Data>
) {
  // DB
  await connect();
  const { choice, pollId, identifier: requestIdentifier } = req.body;
  const identifier = requestIdentifier || req.socket.remoteAddress;
  // TODO block same ip
  const updatedPoll = await Poll.findByIdAndUpdate(
    pollId,
    { $push: { answers: { value: choice, identifier } } },
    { new: true }
  );
  res.status(200).json(updatedPoll);
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
