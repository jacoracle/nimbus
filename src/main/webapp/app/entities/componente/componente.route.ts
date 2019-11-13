import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Componente } from 'app/shared/model/componente.model';
import { ComponenteService } from './componente.service';
import { ComponenteComponent } from './componente.component';
import { ComponenteDetailComponent } from './componente-detail.component';
import { ComponenteUpdateComponent } from './componente-update.component';
import { ComponenteDeletePopupComponent } from './componente-delete-dialog.component';
import { IComponente } from 'app/shared/model/componente.model';

@Injectable({ providedIn: 'root' })
export class ComponenteResolve implements Resolve<IComponente> {
  constructor(private service: ComponenteService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IComponente> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Componente>) => response.ok),
        map((componente: HttpResponse<Componente>) => componente.body)
      );
    }
    return of(new Componente());
  }
}

export const componenteRoute: Routes = [
  {
    path: '',
    component: ComponenteComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'nimbusApp.componente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ComponenteDetailComponent,
    resolve: {
      componente: ComponenteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.componente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ComponenteUpdateComponent,
    resolve: {
      componente: ComponenteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.componente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ComponenteUpdateComponent,
    resolve: {
      componente: ComponenteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.componente.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const componentePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ComponenteDeletePopupComponent,
    resolve: {
      componente: ComponenteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'nimbusApp.componente.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
