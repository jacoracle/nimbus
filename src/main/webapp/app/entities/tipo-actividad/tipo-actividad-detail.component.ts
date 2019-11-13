import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoActividad } from 'app/shared/model/tipo-actividad.model';

@Component({
  selector: 'jhi-tipo-actividad-detail',
  templateUrl: './tipo-actividad-detail.component.html'
})
export class TipoActividadDetailComponent implements OnInit {
  tipoActividad: ITipoActividad;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoActividad }) => {
      this.tipoActividad = tipoActividad;
    });
  }

  previousState() {
    window.history.back();
  }
}
