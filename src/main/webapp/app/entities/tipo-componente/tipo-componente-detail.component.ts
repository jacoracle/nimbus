import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoComponente } from 'app/shared/model/tipo-componente.model';

@Component({
  selector: 'jhi-tipo-componente-detail',
  templateUrl: './tipo-componente-detail.component.html'
})
export class TipoComponenteDetailComponent implements OnInit {
  tipoComponente: ITipoComponente;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoComponente }) => {
      this.tipoComponente = tipoComponente;
    });
  }

  previousState() {
    window.history.back();
  }
}
