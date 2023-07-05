export interface TaskItem {
  id: number;
  title: string;
  description: string;
  status: StatusTask;
}

export enum StatusTask {
  Pendente = 'Pendente',
  Concluida = 'Concluida'
}
