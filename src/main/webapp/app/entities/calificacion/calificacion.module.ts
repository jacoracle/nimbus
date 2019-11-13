import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NimbusSharedModule } from 'app/shared/shared.module';
import { CalificacionComponent } from './calificacion.component';
import { CalificacionDetailComponent } from './calificacion-detail.component';
import { CalificacionUpdateComponent } from './calificacion-update.component';
import { CalificacionDeletePopupComponent, CalificacionDeleteDialogComponent } from './calificacion-delete-dialog.component';
import { calificacionRoute, calificacionPopupRoute } from './calificacion.route';

const ENTITY_STATES = [...calificacionRoute, ...calificacionPopupRoute];

@NgModule({
  imports: [NimbusSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CalificacionComponent,
    CalificacionDetailComponent,
    CalificacionUpdateComponent,
    CalificacionDeleteDialogComponent,
    CalificacionDeletePopupComponent
  ],
  entryComponents: [CalificacionDeleteDialogComponent]
})
export class NimbusCalificacionModule {}
