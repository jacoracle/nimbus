import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISeccion } from 'app/shared/model/seccion.model';
import { SeccionService } from './seccion.service';

@Component({
  selector: 'jhi-seccion-delete-dialog',
  templateUrl: './seccion-delete-dialog.component.html'
})
export class SeccionDeleteDialogComponent {
  seccion: ISeccion;

  constructor(protected seccionService: SeccionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.seccionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'seccionListModification',
        content: 'Deleted an seccion'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-seccion-delete-popup',
  template: ''
})
export class SeccionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ seccion }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SeccionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.seccion = seccion;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/seccion', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/seccion', { outlets: { popup: null } }]);
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
