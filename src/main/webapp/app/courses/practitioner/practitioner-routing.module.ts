import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

@NgModule({
  imports: [
    /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    RouterModule.forChild([
      {
        path: '',
        data: {
          authorities: ['ROLE_ADMIN']
        },
        loadChildren: () => import('./practitioner.module').then(m => m.PractitionerModule)
      },
      {
        path: 'sum',
        data: {
          authorities: ['ROLE_ADMIN']
        },
        loadChildren: () => import('./sum/sum.module').then(m => m.SumModule)
      }
      /* jhipster-needle-add-admin-route - JHipster will add admin routes here */
    ])
  ]
})
export class PractitinerRoutingModule {}
