import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NimbusTestModule } from '../../../test.module';
import { SeccionDetailComponent } from 'app/entities/seccion/seccion-detail.component';
import { Seccion } from 'app/shared/model/seccion.model';

describe('Component Tests', () => {
  describe('Seccion Management Detail Component', () => {
    let comp: SeccionDetailComponent;
    let fixture: ComponentFixture<SeccionDetailComponent>;
    const route = ({ data: of({ seccion: new Seccion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NimbusTestModule],
        declarations: [SeccionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SeccionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SeccionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.seccion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
