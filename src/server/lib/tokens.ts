import { randomInt, randomBytes, createHash } from "crypto";
export const generatePin = () => randomInt(100000, 1000000).toString();
export const newResetToken = () => randomBytes(32).toString("base64url");
export const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");