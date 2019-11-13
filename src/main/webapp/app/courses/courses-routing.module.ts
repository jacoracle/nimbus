import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
/* jhipster-needle-add-courses-module-import - JHipster will add courses modules imports here */

@NgModule({
  imports: [
    /* jhipster-needle-add-courses-module - JHipster will add courses modules here */
    RouterModule.forChild([
      {
        path: 'multiple-choice',
        loadChildren: () => import('./multiple-choice/multiple-choice.module').then(m => m.MultipleChoiceModule)
      }
      /* jhipster-needle-add-courses-route - JHipster will add courses routes here */
    ])
  ]
})
export class CoursesRoutingModule {}
