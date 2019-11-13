import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISeccion, Seccion } from 'app/shared/model/seccion.model';
import { SeccionService } from './seccion.service';
import { ICurso } from 'app/shared/model/curso.model';
import { CursoService } from 'app/entities/curso/curso.service';

@Component({
  selector: 'jhi-seccion-update',
  templateUrl: './seccion-update.component.html'
})
export class SeccionUpdateComponent implements OnInit {
  isSaving: boolean;

  cursos: ICurso[];

  editForm = this.fb.group({
    id: [],
    descripcion: [],
    curso: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected seccionService: SeccionService,
    protected cursoService: CursoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ seccion }) => {
      this.updateForm(seccion);
    });
    this.cursoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICurso[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICurso[]>) => response.body)
      )
      .subscribe((res: ICurso[]) => (this.cursos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(seccion: ISeccion) {
    this.editForm.patchValue({
      id: seccion.id,
      descripcion: seccion.descripcion,
      curso: seccion.curso
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const seccion = this.createFromForm();
    if (seccion.id !== undefined) {
      this.subscribeToSaveResponse(this.seccionService.update(seccion));
    } else {
      this.subscribeToSaveResponse(this.seccionService.create(seccion));
    }
  }

  private createFromForm(): ISeccion {
    return {
      ...new Seccion(),
      id: this.editForm.get(['id']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      curso: this.editForm.get(['curso']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISeccion>>) {
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
}
