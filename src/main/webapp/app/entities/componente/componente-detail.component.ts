import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IComponente } from 'app/shared/model/componente.model';

@Component({
  selector: 'jhi-componente-detail',
  templateUrl: './componente-detail.component.html'
})
export class ComponenteDetailComponent implements OnInit {
  componente: IComponente;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ componente }) => {
      this.componente = componente;
    });
  }

  previousState() {
    window.history.back();
  }
}
