import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NimbusTestModule } from '../../../test.module';
import { EjercicioDeleteDialogComponent } from 'app/entities/ejercicio/ejercicio-delete-dialog.component';
import { EjercicioService } from 'app/entities/ejercicio/ejercicio.service';

describe('Component Tests', () => {
  describe('Ejercicio Management Delete Component', () => {
    let comp: EjercicioDeleteDialogComponent;
    let fixture: ComponentFixture<EjercicioDeleteDialogComponent>;
    let service: EjercicioService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NimbusTestModule],
        declarations: [EjercicioDeleteDialogComponent]
      })
        .overrideTemplate(EjercicioDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EjercicioDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EjercicioService);
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
