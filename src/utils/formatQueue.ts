import { ExternalQueue, FormattedResponse, Queue } from "../types/Queue";
import { getCurrentTimestamp } from "./date";

export const formatExternalQueue = (
  queues: ExternalQueue[]
): FormattedResponse => {
  const now = getCurrentTimestamp();
  const connected: Queue[] = [];
  const disconnected: Queue[] = [];

  for (const queue of queues) {
    const formatted: Queue = {
      id: queue.id,
      nome_fila: queue.name,
      instancia: `instancia-${queue.id}`,
      data_verificacao: now,
      status: queue.connected ? "conectada" : "desconectada",
      chats_em_espera: queue.chatsOnQueue,
    };

    if (queue.connected) {
      connected.push(formatted);
    } else {
      disconnected.push(formatted);
    }
  }

  return { connected, disconnected };
};
