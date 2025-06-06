import { Router } from "express";
import {
  addQueues,
  deleteQueue,
  getQueues,
  updateQueue,
} from "../controllers/queueController";

const router = Router();

router.get("/desconectadas", getQueues);
router.post("/desconectadas", addQueues);
router.put("/desconectadas/:id", updateQueue);
router.delete("/desconectadas/:id", deleteQueue);

export default router;
