import { ICurso } from 'app/shared/model/curso.model';

export interface IPaquete {
  id?: number;
  descripcion?: string;
  cursos?: ICurso[];
}

export class Paquete implements IPaquete {
  constructor(public id?: number, public descripcion?: string, public cursos?: ICurso[]) {}
}
