import dotenv from "dotenv";
dotenv.config();

export const api = process.env.API || '';
export const db = process.env.DB || '';

    