import { IComponente } from 'app/shared/model/componente.model';
import { ITipoActividad } from 'app/shared/model/tipo-actividad.model';

export interface IEjercicio {
  id?: number;
  descripcion?: string;
  contenido?: string;
  componente?: IComponente;
  tipoactividads?: ITipoActividad[];
}

export class Ejercicio implements IEjercicio {
  constructor(
    public id?: number,
    public descripcion?: string,
    public contenido?: string,
    public componente?: IComponente,
    public tipoactividads?: ITipoActividad[]
  ) {}
}
