import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IComponente } from 'app/shared/model/componente.model';
import { ComponenteService } from './componente.service';

@Component({
  selector: 'jhi-componente-delete-dialog',
  templateUrl: './componente-delete-dialog.component.html'
})
export class ComponenteDeleteDialogComponent {
  componente: IComponente;

  constructor(
    protected componenteService: ComponenteService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.componenteService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'componenteListModification',
        content: 'Deleted an componente'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-componente-delete-popup',
  template: ''
})
export class ComponenteDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ componente }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ComponenteDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.componente = componente;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/componente', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/componente', { outlets: { popup: null } }]);
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
