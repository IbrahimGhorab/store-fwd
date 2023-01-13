import { config } from "dotenv";

config();
const port = process.env.PORT;

export default {
  port: +port!,
};
