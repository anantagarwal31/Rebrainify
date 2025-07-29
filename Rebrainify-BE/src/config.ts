import dotenv from "dotenv";
dotenv.config();

export const JWT_PASS = process.env.JWT_PASS!;
export const PORT = process.env.PORT || 3000;
export const MONGO_URL = process.env.MONGO_URL;
