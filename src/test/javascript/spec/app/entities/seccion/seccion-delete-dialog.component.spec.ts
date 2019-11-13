import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NimbusTestModule } from '../../../test.module';
import { SeccionDeleteDialogComponent } from 'app/entities/seccion/seccion-delete-dialog.component';
import { SeccionService } from 'app/entities/seccion/seccion.service';

describe('Component Tests', () => {
  describe('Seccion Management Delete Component', () => {
    let comp: SeccionDeleteDialogComponent;
    let fixture: ComponentFixture<SeccionDeleteDialogComponent>;
    let service: SeccionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NimbusTestModule],
        declarations: [SeccionDeleteDialogComponent]
      })
        .overrideTemplate(SeccionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SeccionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SeccionService);
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
