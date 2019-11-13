import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICurso, Curso } from 'app/shared/model/curso.model';
import { CursoService } from './curso.service';
import { IPaquete } from 'app/shared/model/paquete.model';
import { PaqueteService } from 'app/entities/paquete/paquete.service';

@Component({
  selector: 'jhi-curso-update',
  templateUrl: './curso-update.component.html'
})
export class CursoUpdateComponent implements OnInit {
  isSaving: boolean;

  paquetes: IPaquete[];

  editForm = this.fb.group({
    id: [],
    descripcion: [],
    paquetes: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cursoService: CursoService,
    protected paqueteService: PaqueteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ curso }) => {
      this.updateForm(curso);
    });
    this.paqueteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPaquete[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPaquete[]>) => response.body)
      )
      .subscribe((res: IPaquete[]) => (this.paquetes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(curso: ICurso) {
    this.editForm.patchValue({
      id: curso.id,
      descripcion: curso.descripcion,
      paquetes: curso.paquetes
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const curso = this.createFromForm();
    if (curso.id !== undefined) {
      this.subscribeToSaveResponse(this.cursoService.update(curso));
    } else {
      this.subscribeToSaveResponse(this.cursoService.create(curso));
    }
  }

  private createFromForm(): ICurso {
    return {
      ...new Curso(),
      id: this.editForm.get(['id']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      paquetes: this.editForm.get(['paquetes']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICurso>>) {
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

  trackPaqueteById(index: number, item: IPaquete) {
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
