import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NimbusTestModule } from '../../../test.module';
import { EjercicioDetailComponent } from 'app/entities/ejercicio/ejercicio-detail.component';
import { Ejercicio } from 'app/shared/model/ejercicio.model';

describe('Component Tests', () => {
  describe('Ejercicio Management Detail Component', () => {
    let comp: EjercicioDetailComponent;
    let fixture: ComponentFixture<EjercicioDetailComponent>;
    const route = ({ data: of({ ejercicio: new Ejercicio(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NimbusTestModule],
        declarations: [EjercicioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EjercicioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EjercicioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ejercicio).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
