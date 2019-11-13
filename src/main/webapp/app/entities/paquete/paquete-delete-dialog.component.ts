import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPaquete } from 'app/shared/model/paquete.model';
import { PaqueteService } from './paquete.service';

@Component({
  selector: 'jhi-paquete-delete-dialog',
  templateUrl: './paquete-delete-dialog.component.html'
})
export class PaqueteDeleteDialogComponent {
  paquete: IPaquete;

  constructor(protected paqueteService: PaqueteService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.paqueteService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'paqueteListModification',
        content: 'Deleted an paquete'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-paquete-delete-popup',
  template: ''
})
export class PaqueteDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ paquete }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PaqueteDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.paquete = paquete;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/paquete', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/paquete', { outlets: { popup: null } }]);
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
