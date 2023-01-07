import express, {
  Application,
  Request,
  Response,
  json,
  urlencoded,
} from "express";
import { config } from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import errorMiddleware from "./middleware/errormiddleware";

config();

const app: Application = express();
app.use(json());
app.use(morgan("common"));
app.use(helmet());
// app.use(urlencoded());
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  throw new Error();
  res.send({ message: "hello world" });
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.send({ message: "hello world from post request", data: req.body });
});

app.use(errorMiddleware);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "you lost " });
});

app.listen(port, () => console.log(`server listen to port ${port}`));

export default app;
