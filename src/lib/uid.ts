import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 20);

export const getUid = (size?: number) => {
  return nanoid(size);
};
