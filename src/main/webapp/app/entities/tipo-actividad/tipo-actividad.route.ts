import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoActividad } from 'app/shared/model/tipo-actividad.model';
import { TipoActividadService } from './tipo-actividad.service';
import { TipoActividadComponent } from './tipo-actividad.component';
import { TipoActividadDetailComponent } from './tipo-actividad-detail.component';
import { TipoActividadUpdateComponent } from './tipo-actividad-update.component';
import { TipoActividadDeletePopupComponent } from './tipo-actividad-delete-dialog.component';
import { ITipoActividad } from 'app/shared/model/tipo-actividad.model';

@Injectable({ providedIn: 'root' })
export class TipoActividadResolve implements Resolve<ITipoActividad> {
  constructor(private service: TipoActividadService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoActividad> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoActividad>) => response.ok),
        map((tipoActividad: HttpResponse<TipoActividad>) => tipoActividad.body)
      );
    }
    return of(new TipoActividad());
  }
}

export const tipoActividadRoute: Routes = [
  {
    path: '',
    component: TipoActividadComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'nimbusApp.tipoActividad.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoActividadDetailComponent,
    resolve: {
      tipoActividad: TipoActividadResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.tipoActividad.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoActividadUpdateComponent,
    resolve: {
      tipoActividad: TipoActividadResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.tipoActividad.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoActividadUpdateComponent,
    resolve: {
      tipoActividad: TipoActividadResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.tipoActividad.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoActividadPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoActividadDeletePopupComponent,
    resolve: {
      tipoActividad: TipoActividadResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.tipoActividad.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
