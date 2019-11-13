import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NimbusTestModule } from '../../../test.module';
import { PaqueteDetailComponent } from 'app/entities/paquete/paquete-detail.component';
import { Paquete } from 'app/shared/model/paquete.model';

describe('Component Tests', () => {
  describe('Paquete Management Detail Component', () => {
    let comp: PaqueteDetailComponent;
    let fixture: ComponentFixture<PaqueteDetailComponent>;
    const route = ({ data: of({ paquete: new Paquete(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NimbusTestModule],
        declarations: [PaqueteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PaqueteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PaqueteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.paquete).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
