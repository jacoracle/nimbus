import { IEjercicio } from 'app/shared/model/ejercicio.model';

export interface ITipoActividad {
  id?: number;
  descripcion?: string;
  ejercicios?: IEjercicio[];
}

export class TipoActividad implements ITipoActividad {
  constructor(public id?: number, public descripcion?: string, public ejercicios?: IEjercicio[]) {}
}
