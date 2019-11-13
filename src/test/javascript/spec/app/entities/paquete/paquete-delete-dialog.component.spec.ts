import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NimbusTestModule } from '../../../test.module';
import { PaqueteDeleteDialogComponent } from 'app/entities/paquete/paquete-delete-dialog.component';
import { PaqueteService } from 'app/entities/paquete/paquete.service';

describe('Component Tests', () => {
  describe('Paquete Management Delete Component', () => {
    let comp: PaqueteDeleteDialogComponent;
    let fixture: ComponentFixture<PaqueteDeleteDialogComponent>;
    let service: PaqueteService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NimbusTestModule],
        declarations: [PaqueteDeleteDialogComponent]
      })
        .overrideTemplate(PaqueteDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PaqueteDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaqueteService);
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
