import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NimbusTestModule } from '../../../test.module';
import { TipoComponenteDeleteDialogComponent } from 'app/entities/tipo-componente/tipo-componente-delete-dialog.component';
import { TipoComponenteService } from 'app/entities/tipo-componente/tipo-componente.service';

describe('Component Tests', () => {
  describe('TipoComponente Management Delete Component', () => {
    let comp: TipoComponenteDeleteDialogComponent;
    let fixture: ComponentFixture<TipoComponenteDeleteDialogComponent>;
    let service: TipoComponenteService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NimbusTestModule],
        declarations: [TipoComponenteDeleteDialogComponent]
      })
        .overrideTemplate(TipoComponenteDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoComponenteDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoComponenteService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
