import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ICalificacion, Calificacion } from 'app/shared/model/calificacion.model';
import { CalificacionService } from './calificacion.service';
import { IComponente } from 'app/shared/model/componente.model';
import { ComponenteService } from 'app/entities/componente/componente.service';

@Component({
  selector: 'jhi-calificacion-update',
  templateUrl: './calificacion-update.component.html'
})
export class CalificacionUpdateComponent implements OnInit {
  isSaving: boolean;

  componentes: IComponente[];

  editForm = this.fb.group({
    id: [],
    score: [],
    monedas: [],
    fecha: [],
    intentos: [],
    componente: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected calificacionService: CalificacionService,
    protected componenteService: ComponenteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ calificacion }) => {
      this.updateForm(calificacion);
    });
    this.componenteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IComponente[]>) => mayBeOk.ok),
        map((response: HttpResponse<IComponente[]>) => response.body)
      )
      .subscribe((res: IComponente[]) => (this.componentes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(calificacion: ICalificacion) {
    this.editForm.patchValue({
      id: calificacion.id,
      score: calificacion.score,
      monedas: calificacion.monedas,
      fecha: calificacion.fecha != null ? calificacion.fecha.format(DATE_TIME_FORMAT) : null,
      intentos: calificacion.intentos,
      componente: calificacion.componente
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const calificacion = this.createFromForm();
    if (calificacion.id !== undefined) {
      this.subscribeToSaveResponse(this.calificacionService.update(calificacion));
    } else {
      this.subscribeToSaveResponse(this.calificacionService.create(calificacion));
    }
  }

  private createFromForm(): ICalificacion {
    return {
      ...new Calificacion(),
      id: this.editForm.get(['id']).value,
      score: this.editForm.get(['score']).value,
      monedas: this.editForm.get(['monedas']).value,
      fecha: this.editForm.get(['fecha']).value != null ? moment(this.editForm.get(['fecha']).value, DATE_TIME_FORMAT) : undefined,
      intentos: this.editForm.get(['intentos']).value,
      componente: this.editForm.get(['componente']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICalificacion>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackComponenteById(index: number, item: IComponente) {
    return item.id;
  }
}
