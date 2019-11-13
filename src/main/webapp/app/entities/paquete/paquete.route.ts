import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Paquete } from 'app/shared/model/paquete.model';
import { PaqueteService } from './paquete.service';
import { PaqueteComponent } from './paquete.component';
import { PaqueteDetailComponent } from './paquete-detail.component';
import { PaqueteUpdateComponent } from './paquete-update.component';
import { PaqueteDeletePopupComponent } from './paquete-delete-dialog.component';
import { IPaquete } from 'app/shared/model/paquete.model';

@Injectable({ providedIn: 'root' })
export class PaqueteResolve implements Resolve<IPaquete> {
  constructor(private service: PaqueteService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPaquete> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Paquete>) => response.ok),
        map((paquete: HttpResponse<Paquete>) => paquete.body)
      );
    }
    return of(new Paquete());
  }
}

export const paqueteRoute: Routes = [
  {
    path: '',
    component: PaqueteComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'nimbusApp.paquete.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PaqueteDetailComponent,
    resolve: {
      paquete: PaqueteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.paquete.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PaqueteUpdateComponent,
    resolve: {
      paquete: PaqueteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.paquete.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PaqueteUpdateComponent,
    resolve: {
      paquete: PaqueteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.paquete.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const paquetePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PaqueteDeletePopupComponent,
    resolve: {
      paquete: PaqueteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.paquete.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
