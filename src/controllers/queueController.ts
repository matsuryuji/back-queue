import { NextFunction, Request, Response } from "express";
import init from "../models/database";
import { Queue } from "../types/Queue";
import { getCurrentTimestamp } from "../utils/date";
import { formatExternalQueue } from "../utils/formatQueue";

export const getQueues = async (req: Request, res: Response) => {
  const db = await init();
  const queues = await db.all<Queue[]>("SELECT * FROM queues");
  res.json(queues);
};

export const addQueues = async (req: Request, res: Response) => {
  const { url, apiKey } = req.body;

  if (!url || !apiKey) {
    res.status(400).json({ error: "URL e API Key são obrigatórios" });
  }

  try {
    const response = await fetch(`${url}/int/getAllQueues`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey }),
    });

    if (!response.ok) {
      res
        .status(response.status)
        .json({ message: "Erro ao acessar API externa" });
    }

    const apiData = await response.json();
    const { connected, disconnected } = formatExternalQueue(apiData);
    const db = await init();

    let now = new Date().toISOString();

    for (const queue of disconnected) {
      const exists = await db.get(
        `SELECT * FROM queues WHERE nome_fila = ? AND instancia = ?`,
        [queue.nome_fila, queue.instancia]
      );

      if (!exists) {
        await db.run(
          `INSERT INTO queues (id, nome_fila, instancia, data_verificacao, status, chats_em_espera)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            queue.id,
            queue.nome_fila,
            queue.instancia,
            queue.data_verificacao,
            queue.status,
            queue.chats_em_espera,
          ]
        );
      }
    }

    for (const queue of connected) {
      const previouslyDisconnected = await db.get(
        `SELECT * FROM queues WHERE nome_fila = ? AND instancia = ? AND status = 'desconectada'`,
        [queue.nome_fila, queue.instancia]
      );

      if (previouslyDisconnected) {
        await db.run(
          `UPDATE queues SET status = 'conectada', data_conexao = ? WHERE id = ?`,
          [now, previouslyDisconnected.id]
        );

        // Add `data_conexao` to the returned object
        queue["data_conexao"] = now;
      }
    }

    res.status(200).json({ connected });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error: "Erro ao processar a requisição" });
  }
};
export const updateQueue = async (req: Request, res: Response) => {
  const id = req.params.id;
  const db = await init();
  const now = getCurrentTimestamp();
  await db.run(
    `UPDATE queues SET status = 'conectada', data_conexao = ? WHERE id = ?`,
    [now, id]
  );
  res.json({ message: "Fila atualizada" });
};

export const deleteQueue = async (req: Request, res: Response) => {
  const id = req.params.id;
  const db = await init();
  await db.run(`DELETE FROM queues WHERE id = ?`, [id]);
  res.status(204).send();
};
