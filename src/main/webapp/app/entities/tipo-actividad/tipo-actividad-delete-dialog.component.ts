import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoActividad } from 'app/shared/model/tipo-actividad.model';
import { TipoActividadService } from './tipo-actividad.service';

@Component({
  selector: 'jhi-tipo-actividad-delete-dialog',
  templateUrl: './tipo-actividad-delete-dialog.component.html'
})
export class TipoActividadDeleteDialogComponent {
  tipoActividad: ITipoActividad;

  constructor(
    protected tipoActividadService: TipoActividadService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoActividadService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoActividadListModification',
        content: 'Deleted an tipoActividad'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-actividad-delete-popup',
  template: ''
})
export class TipoActividadDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoActividad }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoActividadDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoActividad = tipoActividad;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-actividad', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-actividad', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
