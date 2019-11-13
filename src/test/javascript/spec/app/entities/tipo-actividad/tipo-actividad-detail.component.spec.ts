import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NimbusTestModule } from '../../../test.module';
import { TipoActividadDetailComponent } from 'app/entities/tipo-actividad/tipo-actividad-detail.component';
import { TipoActividad } from 'app/shared/model/tipo-actividad.model';

describe('Component Tests', () => {
  describe('TipoActividad Management Detail Component', () => {
    let comp: TipoActividadDetailComponent;
    let fixture: ComponentFixture<TipoActividadDetailComponent>;
    const route = ({ data: of({ tipoActividad: new TipoActividad(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NimbusTestModule],
        declarations: [TipoActividadDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoActividadDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoActividadDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoActividad).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
