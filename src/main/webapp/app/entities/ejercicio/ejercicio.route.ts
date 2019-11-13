import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Ejercicio } from 'app/shared/model/ejercicio.model';
import { EjercicioService } from './ejercicio.service';
import { EjercicioComponent } from './ejercicio.component';
import { EjercicioDetailComponent } from './ejercicio-detail.component';
import { EjercicioUpdateComponent } from './ejercicio-update.component';
import { EjercicioDeletePopupComponent } from './ejercicio-delete-dialog.component';
import { IEjercicio } from 'app/shared/model/ejercicio.model';

@Injectable({ providedIn: 'root' })
export class EjercicioResolve implements Resolve<IEjercicio> {
  constructor(private service: EjercicioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEjercicio> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Ejercicio>) => response.ok),
        map((ejercicio: HttpResponse<Ejercicio>) => ejercicio.body)
      );
    }
    return of(new Ejercicio());
  }
}

export const ejercicioRoute: Routes = [
  {
    path: '',
    component: EjercicioComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'nimbusApp.ejercicio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EjercicioDetailComponent,
    resolve: {
      ejercicio: EjercicioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.ejercicio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EjercicioUpdateComponent,
    resolve: {
      ejercicio: EjercicioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.ejercicio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EjercicioUpdateComponent,
    resolve: {
      ejercicio: EjercicioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.ejercicio.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ejercicioPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EjercicioDeletePopupComponent,
    resolve: {
      ejercicio: EjercicioResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.ejercicio.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
