import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { NimbusTestModule } from '../../../test.module';
import { SeccionUpdateComponent } from 'app/entities/seccion/seccion-update.component';
import { SeccionService } from 'app/entities/seccion/seccion.service';
import { Seccion } from 'app/shared/model/seccion.model';

describe('Component Tests', () => {
  describe('Seccion Management Update Component', () => {
    let comp: SeccionUpdateComponent;
    let fixture: ComponentFixture<SeccionUpdateComponent>;
    let service: SeccionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NimbusTestModule],
        declarations: [SeccionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SeccionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SeccionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SeccionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Seccion(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Seccion();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
