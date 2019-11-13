import { Moment } from 'moment';
import { IComponente } from 'app/shared/model/componente.model';

export interface ICalificacion {
  id?: number;
  score?: string;
  monedas?: number;
  fecha?: Moment;
  intentos?: number;
  componente?: IComponente;
}

export class Calificacion implements ICalificacion {
  constructor(
    public id?: number,
    public score?: string,
    public monedas?: number,
    public fecha?: Moment,
    public intentos?: number,
    public componente?: IComponente
  ) {}
}
