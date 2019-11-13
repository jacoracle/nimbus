export interface ITipoComponente {
  id?: number;
  descripcion?: string;
}

export class TipoComponente implements ITipoComponente {
  constructor(public id?: number, public descripcion?: string) {}
}
