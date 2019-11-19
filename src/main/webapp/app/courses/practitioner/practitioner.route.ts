import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { PractitionerComponent } from './practitioner.component';
import { SumComponent } from './sum/sum.component';

@Injectable({ providedIn: 'root' })
export class PractitionerResolve implements Resolve<any> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    throw new Error('Method not implemented.');
  }
}

export const practitionerRoute: Routes = [
  {
    path: '',
    component: PractitionerComponent,
    data: {
      pageTitle: 'Opción Múltiple'
    }
  },
  {
    path: 'sum',
    component: SumComponent,
    data: {
      pageTitle: 'Suma'
    }
  }
];
