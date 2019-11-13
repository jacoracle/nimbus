import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { NimbusTestModule } from '../../../test.module';
import { TipoActividadUpdateComponent } from 'app/entities/tipo-actividad/tipo-actividad-update.component';
import { TipoActividadService } from 'app/entities/tipo-actividad/tipo-actividad.service';
import { TipoActividad } from 'app/shared/model/tipo-actividad.model';

describe('Component Tests', () => {
  describe('TipoActividad Management Update Component', () => {
    let comp: TipoActividadUpdateComponent;
    let fixture: ComponentFixture<TipoActividadUpdateComponent>;
    let service: TipoActividadService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NimbusTestModule],
        declarations: [TipoActividadUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoActividadUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoActividadUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoActividadService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoActividad(123);
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
        const entity = new TipoActividad();
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
