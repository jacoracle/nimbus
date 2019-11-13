import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NimbusTestModule } from '../../../test.module';
import { ComponenteDeleteDialogComponent } from 'app/entities/componente/componente-delete-dialog.component';
import { ComponenteService } from 'app/entities/componente/componente.service';

describe('Component Tests', () => {
  describe('Componente Management Delete Component', () => {
    let comp: ComponenteDeleteDialogComponent;
    let fixture: ComponentFixture<ComponenteDeleteDialogComponent>;
    let service: ComponenteService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NimbusTestModule],
        declarations: [ComponenteDeleteDialogComponent]
      })
        .overrideTemplate(ComponenteDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ComponenteDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ComponenteService);
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
