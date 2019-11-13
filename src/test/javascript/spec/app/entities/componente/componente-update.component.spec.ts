import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { NimbusTestModule } from '../../../test.module';
import { ComponenteUpdateComponent } from 'app/entities/componente/componente-update.component';
import { ComponenteService } from 'app/entities/componente/componente.service';
import { Componente } from 'app/shared/model/componente.model';

describe('Component Tests', () => {
  describe('Componente Management Update Component', () => {
    let comp: ComponenteUpdateComponent;
    let fixture: ComponentFixture<ComponenteUpdateComponent>;
    let service: ComponenteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NimbusTestModule],
        declarations: [ComponenteUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ComponenteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ComponenteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ComponenteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Componente(123);
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
        const entity = new Componente();
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
