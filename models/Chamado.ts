export interface Usuario {
  nme_Usuario: string;
  img_Usuario: string;
}

export interface Chamado {
  id: number;
  cliente: Usuario;
  dta_Inicio_Conversa: string;
  stt_Conversa: number;
  tipo_Conversa: number;
} 