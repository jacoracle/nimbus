import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEjercicio } from 'app/shared/model/ejercicio.model';

@Component({
  selector: 'jhi-ejercicio-detail',
  templateUrl: './ejercicio-detail.component.html'
})
export class EjercicioDetailComponent implements OnInit {
  ejercicio: IEjercicio;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ejercicio }) => {
      this.ejercicio = ejercicio;
    });
  }

  previousState() {
    window.history.back();
  }
}
