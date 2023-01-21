import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} from "../../controller/userController";
// import * as controllers from "../../controller/userController";
const router = Router();

// routing using router.route
router.route("/").get(getAll).post(create);
router.route("/:id").get(getOne).patch(updateOne).delete(deleteOne);

export default router;
