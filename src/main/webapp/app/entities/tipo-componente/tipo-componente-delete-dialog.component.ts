import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoComponente } from 'app/shared/model/tipo-componente.model';
import { TipoComponenteService } from './tipo-componente.service';

@Component({
  selector: 'jhi-tipo-componente-delete-dialog',
  templateUrl: './tipo-componente-delete-dialog.component.html'
})
export class TipoComponenteDeleteDialogComponent {
  tipoComponente: ITipoComponente;

  constructor(
    protected tipoComponenteService: TipoComponenteService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoComponenteService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoComponenteListModification',
        content: 'Deleted an tipoComponente'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-componente-delete-popup',
  template: ''
})
export class TipoComponenteDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoComponente }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoComponenteDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoComponente = tipoComponente;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-componente', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-componente', { outlets: { popup: null } }]);
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
