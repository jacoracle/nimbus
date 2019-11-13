import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IComponente, Componente } from 'app/shared/model/componente.model';
import { ComponenteService } from './componente.service';
import { ITipoComponente } from 'app/shared/model/tipo-componente.model';
import { TipoComponenteService } from 'app/entities/tipo-componente/tipo-componente.service';
import { ISeccion } from 'app/shared/model/seccion.model';
import { SeccionService } from 'app/entities/seccion/seccion.service';

@Component({
  selector: 'jhi-componente-update',
  templateUrl: './componente-update.component.html'
})
export class ComponenteUpdateComponent implements OnInit {
  isSaving: boolean;

  tipocomponentes: ITipoComponente[];

  seccions: ISeccion[];

  editForm = this.fb.group({
    id: [],
    descripcion: [],
    version: [],
    tipocomponente: [],
    seccion: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected componenteService: ComponenteService,
    protected tipoComponenteService: TipoComponenteService,
    protected seccionService: SeccionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ componente }) => {
      this.updateForm(componente);
    });
    this.tipoComponenteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoComponente[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoComponente[]>) => response.body)
      )
      .subscribe((res: ITipoComponente[]) => (this.tipocomponentes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.seccionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISeccion[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISeccion[]>) => response.body)
      )
      .subscribe((res: ISeccion[]) => (this.seccions = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(componente: IComponente) {
    this.editForm.patchValue({
      id: componente.id,
      descripcion: componente.descripcion,
      version: componente.version,
      tipocomponente: componente.tipocomponente,
      seccion: componente.seccion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const componente = this.createFromForm();
    if (componente.id !== undefined) {
      this.subscribeToSaveResponse(this.componenteService.update(componente));
    } else {
      this.subscribeToSaveResponse(this.componenteService.create(componente));
    }
  }

  private createFromForm(): IComponente {
    return {
      ...new Componente(),
      id: this.editForm.get(['id']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      version: this.editForm.get(['version']).value,
      tipocomponente: this.editForm.get(['tipocomponente']).value,
      seccion: this.editForm.get(['seccion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IComponente>>) {
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

  trackTipoComponenteById(index: number, item: ITipoComponente) {
    return item.id;
  }

  trackSeccionById(index: number, item: ISeccion) {
    return item.id;
  }
}
