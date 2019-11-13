import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { NimbusTestModule } from '../../../test.module';
import { EjercicioUpdateComponent } from 'app/entities/ejercicio/ejercicio-update.component';
import { EjercicioService } from 'app/entities/ejercicio/ejercicio.service';
import { Ejercicio } from 'app/shared/model/ejercicio.model';

describe('Component Tests', () => {
  describe('Ejercicio Management Update Component', () => {
    let comp: EjercicioUpdateComponent;
    let fixture: ComponentFixture<EjercicioUpdateComponent>;
    let service: EjercicioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NimbusTestModule],
        declarations: [EjercicioUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EjercicioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EjercicioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EjercicioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Ejercicio(123);
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
        const entity = new Ejercicio();
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
