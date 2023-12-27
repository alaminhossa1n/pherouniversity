import bcrypt from "bcrypt";
import config from "../../config";

export const makeHashed = async (planePassword: string) => {
  const result = await bcrypt.hash(planePassword, Number(config.salt_rounds));
  return result;
};

export const comparePassword = async (plaintext: string, hash: string) => {
  const result = bcrypt.compare(plaintext, hash);
  return result;
};
