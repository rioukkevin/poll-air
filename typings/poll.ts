import { Document } from "mongoose";

export interface IAnswer {
  value: string;
  identifier: string;
}

export interface IPoll extends Document {
  name: string;
  choices: string[];
  answers: IAnswer[];
  options: {
    multiple?: boolean;
    endDate?: Date;
  };
}
