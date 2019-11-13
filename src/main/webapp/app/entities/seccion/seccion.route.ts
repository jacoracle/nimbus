import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Seccion } from 'app/shared/model/seccion.model';
import { SeccionService } from './seccion.service';
import { SeccionComponent } from './seccion.component';
import { SeccionDetailComponent } from './seccion-detail.component';
import { SeccionUpdateComponent } from './seccion-update.component';
import { SeccionDeletePopupComponent } from './seccion-delete-dialog.component';
import { ISeccion } from 'app/shared/model/seccion.model';

@Injectable({ providedIn: 'root' })
export class SeccionResolve implements Resolve<ISeccion> {
  constructor(private service: SeccionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISeccion> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Seccion>) => response.ok),
        map((seccion: HttpResponse<Seccion>) => seccion.body)
      );
    }
    return of(new Seccion());
  }
}

export const seccionRoute: Routes = [
  {
    path: '',
    component: SeccionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'nimbusApp.seccion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SeccionDetailComponent,
    resolve: {
      seccion: SeccionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.seccion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SeccionUpdateComponent,
    resolve: {
      seccion: SeccionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.seccion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SeccionUpdateComponent,
    resolve: {
      seccion: SeccionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.seccion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const seccionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SeccionDeletePopupComponent,
    resolve: {
      seccion: SeccionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.seccion.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
