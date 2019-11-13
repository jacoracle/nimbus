import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITipoActividad, TipoActividad } from 'app/shared/model/tipo-actividad.model';
import { TipoActividadService } from './tipo-actividad.service';
import { IEjercicio } from 'app/shared/model/ejercicio.model';
import { EjercicioService } from 'app/entities/ejercicio/ejercicio.service';

@Component({
  selector: 'jhi-tipo-actividad-update',
  templateUrl: './tipo-actividad-update.component.html'
})
export class TipoActividadUpdateComponent implements OnInit {
  isSaving: boolean;

  ejercicios: IEjercicio[];

  editForm = this.fb.group({
    id: [],
    descripcion: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tipoActividadService: TipoActividadService,
    protected ejercicioService: EjercicioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoActividad }) => {
      this.updateForm(tipoActividad);
    });
    this.ejercicioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEjercicio[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEjercicio[]>) => response.body)
      )
      .subscribe((res: IEjercicio[]) => (this.ejercicios = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tipoActividad: ITipoActividad) {
    this.editForm.patchValue({
      id: tipoActividad.id,
      descripcion: tipoActividad.descripcion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoActividad = this.createFromForm();
    if (tipoActividad.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoActividadService.update(tipoActividad));
    } else {
      this.subscribeToSaveResponse(this.tipoActividadService.create(tipoActividad));
    }
  }

  private createFromForm(): ITipoActividad {
    return {
      ...new TipoActividad(),
      id: this.editForm.get(['id']).value,
      descripcion: this.editForm.get(['descripcion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoActividad>>) {
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

  trackEjercicioById(index: number, item: IEjercicio) {
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
