import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NimbusSharedModule } from 'app/shared/shared.module';
import { SeccionComponent } from './seccion.component';
import { SeccionDetailComponent } from './seccion-detail.component';
import { SeccionUpdateComponent } from './seccion-update.component';
import { SeccionDeletePopupComponent, SeccionDeleteDialogComponent } from './seccion-delete-dialog.component';
import { seccionRoute, seccionPopupRoute } from './seccion.route';

const ENTITY_STATES = [...seccionRoute, ...seccionPopupRoute];

@NgModule({
  imports: [NimbusSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SeccionComponent,
    SeccionDetailComponent,
    SeccionUpdateComponent,
    SeccionDeleteDialogComponent,
    SeccionDeletePopupComponent
  ],
  entryComponents: [SeccionDeleteDialogComponent]
})
export class NimbusSeccionModule {}
