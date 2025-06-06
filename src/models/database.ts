import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

const dbPath = path.resolve(__dirname, "../../database/db.sqlite");

const init = async () => {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS queues (
      id INTEGER PRIMARY KEY,
      nome_fila TEXT,
      instancia TEXT,
      data_verificacao TEXT,
      status TEXT,
      data_conexao TEXT,
      chats_em_espera INTEGER
    );
  `);

  return db;
};

export default init;
