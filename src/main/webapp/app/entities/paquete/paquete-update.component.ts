import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPaquete, Paquete } from 'app/shared/model/paquete.model';
import { PaqueteService } from './paquete.service';
import { ICurso } from 'app/shared/model/curso.model';
import { CursoService } from 'app/entities/curso/curso.service';

@Component({
  selector: 'jhi-paquete-update',
  templateUrl: './paquete-update.component.html'
})
export class PaqueteUpdateComponent implements OnInit {
  isSaving: boolean;

  cursos: ICurso[];

  editForm = this.fb.group({
    id: [],
    descripcion: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected paqueteService: PaqueteService,
    protected cursoService: CursoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ paquete }) => {
      this.updateForm(paquete);
    });
    this.cursoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICurso[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICurso[]>) => response.body)
      )
      .subscribe((res: ICurso[]) => (this.cursos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(paquete: IPaquete) {
    this.editForm.patchValue({
      id: paquete.id,
      descripcion: paquete.descripcion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const paquete = this.createFromForm();
    if (paquete.id !== undefined) {
      this.subscribeToSaveResponse(this.paqueteService.update(paquete));
    } else {
      this.subscribeToSaveResponse(this.paqueteService.create(paquete));
    }
  }

  private createFromForm(): IPaquete {
    return {
      ...new Paquete(),
      id: this.editForm.get(['id']).value,
      descripcion: this.editForm.get(['descripcion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaquete>>) {
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

  trackCursoById(index: number, item: ICurso) {
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
