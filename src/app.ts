import express, { Request, Response } from "express";
import cors from "cors";
import queueRoute from "./routes/queueRoute";

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
app.use("/queue", queueRoute);
app.get("/", function (req, res) {
  res.send("Olá Mundo!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
