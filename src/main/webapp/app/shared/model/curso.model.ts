import { IPaquete } from 'app/shared/model/paquete.model';

export interface ICurso {
  id?: number;
  descripcion?: string;
  paquetes?: IPaquete[];
}

export class Curso implements ICurso {
  constructor(public id?: number, public descripcion?: string, public paquetes?: IPaquete[]) {}
}
