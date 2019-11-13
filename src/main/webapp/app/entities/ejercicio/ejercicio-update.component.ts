import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IEjercicio, Ejercicio } from 'app/shared/model/ejercicio.model';
import { EjercicioService } from './ejercicio.service';
import { IComponente } from 'app/shared/model/componente.model';
import { ComponenteService } from 'app/entities/componente/componente.service';
import { ITipoActividad } from 'app/shared/model/tipo-actividad.model';
import { TipoActividadService } from 'app/entities/tipo-actividad/tipo-actividad.service';

@Component({
  selector: 'jhi-ejercicio-update',
  templateUrl: './ejercicio-update.component.html'
})
export class EjercicioUpdateComponent implements OnInit {
  isSaving: boolean;

  componentes: IComponente[];

  tipoactividads: ITipoActividad[];

  editForm = this.fb.group({
    id: [],
    descripcion: [],
    contenido: [],
    componente: [],
    tipoactividads: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ejercicioService: EjercicioService,
    protected componenteService: ComponenteService,
    protected tipoActividadService: TipoActividadService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ejercicio }) => {
      this.updateForm(ejercicio);
    });
    this.componenteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IComponente[]>) => mayBeOk.ok),
        map((response: HttpResponse<IComponente[]>) => response.body)
      )
      .subscribe((res: IComponente[]) => (this.componentes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tipoActividadService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoActividad[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoActividad[]>) => response.body)
      )
      .subscribe((res: ITipoActividad[]) => (this.tipoactividads = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(ejercicio: IEjercicio) {
    this.editForm.patchValue({
      id: ejercicio.id,
      descripcion: ejercicio.descripcion,
      contenido: ejercicio.contenido,
      componente: ejercicio.componente,
      tipoactividads: ejercicio.tipoactividads
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ejercicio = this.createFromForm();
    if (ejercicio.id !== undefined) {
      this.subscribeToSaveResponse(this.ejercicioService.update(ejercicio));
    } else {
      this.subscribeToSaveResponse(this.ejercicioService.create(ejercicio));
    }
  }

  private createFromForm(): IEjercicio {
    return {
      ...new Ejercicio(),
      id: this.editForm.get(['id']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      contenido: this.editForm.get(['contenido']).value,
      componente: this.editForm.get(['componente']).value,
      tipoactividads: this.editForm.get(['tipoactividads']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEjercicio>>) {
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

  trackTipoActividadById(index: number, item: ITipoActividad) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
