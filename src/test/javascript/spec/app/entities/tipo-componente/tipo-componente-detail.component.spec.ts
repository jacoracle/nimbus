import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NimbusTestModule } from '../../../test.module';
import { TipoComponenteDetailComponent } from 'app/entities/tipo-componente/tipo-componente-detail.component';
import { TipoComponente } from 'app/shared/model/tipo-componente.model';

describe('Component Tests', () => {
  describe('TipoComponente Management Detail Component', () => {
    let comp: TipoComponenteDetailComponent;
    let fixture: ComponentFixture<TipoComponenteDetailComponent>;
    const route = ({ data: of({ tipoComponente: new TipoComponente(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NimbusTestModule],
        declarations: [TipoComponenteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TipoComponenteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoComponenteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoComponente).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
