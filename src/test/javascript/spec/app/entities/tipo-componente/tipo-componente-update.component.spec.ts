import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { NimbusTestModule } from '../../../test.module';
import { TipoComponenteUpdateComponent } from 'app/entities/tipo-componente/tipo-componente-update.component';
import { TipoComponenteService } from 'app/entities/tipo-componente/tipo-componente.service';
import { TipoComponente } from 'app/shared/model/tipo-componente.model';

describe('Component Tests', () => {
  describe('TipoComponente Management Update Component', () => {
    let comp: TipoComponenteUpdateComponent;
    let fixture: ComponentFixture<TipoComponenteUpdateComponent>;
    let service: TipoComponenteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NimbusTestModule],
        declarations: [TipoComponenteUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TipoComponenteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoComponenteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoComponenteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoComponente(123);
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
        const entity = new TipoComponente();
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
