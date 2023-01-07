import express, { Application, Request, Response } from "express";
import { config } from "dotenv";

config();

const app: Application = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "hello world" });
});

app.listen(port, () => console.log(`server listen to port ${port}`));

export default app;
