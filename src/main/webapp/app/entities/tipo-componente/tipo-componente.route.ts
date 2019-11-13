import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoComponente } from 'app/shared/model/tipo-componente.model';
import { TipoComponenteService } from './tipo-componente.service';
import { TipoComponenteComponent } from './tipo-componente.component';
import { TipoComponenteDetailComponent } from './tipo-componente-detail.component';
import { TipoComponenteUpdateComponent } from './tipo-componente-update.component';
import { TipoComponenteDeletePopupComponent } from './tipo-componente-delete-dialog.component';
import { ITipoComponente } from 'app/shared/model/tipo-componente.model';

@Injectable({ providedIn: 'root' })
export class TipoComponenteResolve implements Resolve<ITipoComponente> {
  constructor(private service: TipoComponenteService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoComponente> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoComponente>) => response.ok),
        map((tipoComponente: HttpResponse<TipoComponente>) => tipoComponente.body)
      );
    }
    return of(new TipoComponente());
  }
}

export const tipoComponenteRoute: Routes = [
  {
    path: '',
    component: TipoComponenteComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'nimbusApp.tipoComponente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoComponenteDetailComponent,
    resolve: {
      tipoComponente: TipoComponenteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.tipoComponente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoComponenteUpdateComponent,
    resolve: {
      tipoComponente: TipoComponenteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.tipoComponente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoComponenteUpdateComponent,
    resolve: {
      tipoComponente: TipoComponenteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.tipoComponente.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoComponentePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoComponenteDeletePopupComponent,
    resolve: {
      tipoComponente: TipoComponenteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.tipoComponente.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
