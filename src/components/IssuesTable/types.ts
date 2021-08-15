import { LocationDescriptor } from "history";

export type Issue = {
  title: string;
  state: string;
  id: number;
  author: string;
  number: number;
  comments: number;
  link: LocationDescriptor;
  date: Date;
};
