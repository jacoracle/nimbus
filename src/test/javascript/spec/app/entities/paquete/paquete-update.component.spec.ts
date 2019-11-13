import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { NimbusTestModule } from '../../../test.module';
import { PaqueteUpdateComponent } from 'app/entities/paquete/paquete-update.component';
import { PaqueteService } from 'app/entities/paquete/paquete.service';
import { Paquete } from 'app/shared/model/paquete.model';

describe('Component Tests', () => {
  describe('Paquete Management Update Component', () => {
    let comp: PaqueteUpdateComponent;
    let fixture: ComponentFixture<PaqueteUpdateComponent>;
    let service: PaqueteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NimbusTestModule],
        declarations: [PaqueteUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PaqueteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaqueteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaqueteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Paquete(123);
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
        const entity = new Paquete();
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
