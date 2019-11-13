import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Calificacion } from 'app/shared/model/calificacion.model';
import { CalificacionService } from './calificacion.service';
import { CalificacionComponent } from './calificacion.component';
import { CalificacionDetailComponent } from './calificacion-detail.component';
import { CalificacionUpdateComponent } from './calificacion-update.component';
import { CalificacionDeletePopupComponent } from './calificacion-delete-dialog.component';
import { ICalificacion } from 'app/shared/model/calificacion.model';

@Injectable({ providedIn: 'root' })
export class CalificacionResolve implements Resolve<ICalificacion> {
  constructor(private service: CalificacionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICalificacion> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Calificacion>) => response.ok),
        map((calificacion: HttpResponse<Calificacion>) => calificacion.body)
      );
    }
    return of(new Calificacion());
  }
}

export const calificacionRoute: Routes = [
  {
    path: '',
    component: CalificacionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'nimbusApp.calificacion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CalificacionDetailComponent,
    resolve: {
      calificacion: CalificacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.calificacion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CalificacionUpdateComponent,
    resolve: {
      calificacion: CalificacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.calificacion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CalificacionUpdateComponent,
    resolve: {
      calificacion: CalificacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.calificacion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const calificacionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CalificacionDeletePopupComponent,
    resolve: {
      calificacion: CalificacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.calificacion.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
