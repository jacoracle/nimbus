import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NimbusTestModule } from '../../../test.module';
import { TipoActividadDeleteDialogComponent } from 'app/entities/tipo-actividad/tipo-actividad-delete-dialog.component';
import { TipoActividadService } from 'app/entities/tipo-actividad/tipo-actividad.service';

describe('Component Tests', () => {
  describe('TipoActividad Management Delete Component', () => {
    let comp: TipoActividadDeleteDialogComponent;
    let fixture: ComponentFixture<TipoActividadDeleteDialogComponent>;
    let service: TipoActividadService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NimbusTestModule],
        declarations: [TipoActividadDeleteDialogComponent]
      })
        .overrideTemplate(TipoActividadDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoActividadDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoActividadService);
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
