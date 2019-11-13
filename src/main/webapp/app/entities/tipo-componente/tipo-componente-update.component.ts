import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITipoComponente, TipoComponente } from 'app/shared/model/tipo-componente.model';
import { TipoComponenteService } from './tipo-componente.service';

@Component({
  selector: 'jhi-tipo-componente-update',
  templateUrl: './tipo-componente-update.component.html'
})
export class TipoComponenteUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    descripcion: []
  });

  constructor(protected tipoComponenteService: TipoComponenteService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoComponente }) => {
      this.updateForm(tipoComponente);
    });
  }

  updateForm(tipoComponente: ITipoComponente) {
    this.editForm.patchValue({
      id: tipoComponente.id,
      descripcion: tipoComponente.descripcion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoComponente = this.createFromForm();
    if (tipoComponente.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoComponenteService.update(tipoComponente));
    } else {
      this.subscribeToSaveResponse(this.tipoComponenteService.create(tipoComponente));
    }
  }

  private createFromForm(): ITipoComponente {
    return {
      ...new TipoComponente(),
      id: this.editForm.get(['id']).value,
      descripcion: this.editForm.get(['descripcion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoComponente>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
