export type Queue = {
  id: number;
  nome_fila: string;
  instancia: string;
  data_verificacao: string;
  status: "conectada" | "desconectada";
  data_conexao?: string;
  chats_em_espera: number;
};

export type ExternalQueue = {
  id: number;
  name: string;
  connected: boolean;
  authenticated: boolean;
  authenticatedNumber: string;
  enabled: boolean;
  distributionStrategy: number;
  type: string;
  openChats: number;
  chatsOnQueue: number;
  ivrId: number;
  loggedAgentsCount: number;
};

export type FormattedResponse = {
  connected: Queue[];
  disconnected: Queue[];
};
