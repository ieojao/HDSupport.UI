import { useEffect, useState } from 'react';
import { Chamado } from '../models/Chamado';

export function useChamados(tipo: number, aceito = false) {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/Conversa/Listar-Chamados?tipo=${tipo}&aceito=${aceito}`)
      .then(res => res.json())
      .then(data => setChamados(data))
      .finally(() => setLoading(false));
  }, [tipo, aceito]);

  return { chamados, loading };
} 