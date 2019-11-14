import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { MultipleChoiceComponent } from './multiple-choice.component';

@Injectable({ providedIn: 'root' })
export class MultipleChoiceResolve implements Resolve<any> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    throw new Error('Method not implemented.');
  }
}

export const multipleChoiceRoute: Routes = [
  {
    path: '',
    component: MultipleChoiceComponent,
    data: {
      pageTitle: 'Opción Múltiple'
    }
  }
];
