import { ICurso } from 'app/shared/model/curso.model';

export interface ISeccion {
  id?: number;
  descripcion?: string;
  curso?: ICurso;
}

export class Seccion implements ISeccion {
  constructor(public id?: number, public descripcion?: string, public curso?: ICurso) {}
}
