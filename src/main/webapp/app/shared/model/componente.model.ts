import { ITipoComponente } from 'app/shared/model/tipo-componente.model';
import { ISeccion } from 'app/shared/model/seccion.model';

export interface IComponente {
  id?: number;
  descripcion?: string;
  version?: number;
  tipocomponente?: ITipoComponente;
  seccion?: ISeccion;
}

export class Componente implements IComponente {
  constructor(
    public id?: number,
    public descripcion?: string,
    public version?: number,
    public tipocomponente?: ITipoComponente,
    public seccion?: ISeccion
  ) {}
}
