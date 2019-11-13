import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPaquete } from 'app/shared/model/paquete.model';

@Component({
  selector: 'jhi-paquete-detail',
  templateUrl: './paquete-detail.component.html'
})
export class PaqueteDetailComponent implements OnInit {
  paquete: IPaquete;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ paquete }) => {
      this.paquete = paquete;
    });
  }

  previousState() {
    window.history.back();
  }
}
