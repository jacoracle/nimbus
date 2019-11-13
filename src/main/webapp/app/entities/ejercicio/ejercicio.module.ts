import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NimbusSharedModule } from 'app/shared/shared.module';
import { EjercicioComponent } from './ejercicio.component';
import { EjercicioDetailComponent } from './ejercicio-detail.component';
import { EjercicioUpdateComponent } from './ejercicio-update.component';
import { EjercicioDeletePopupComponent, EjercicioDeleteDialogComponent } from './ejercicio-delete-dialog.component';
import { ejercicioRoute, ejercicioPopupRoute } from './ejercicio.route';

const ENTITY_STATES = [...ejercicioRoute, ...ejercicioPopupRoute];

@NgModule({
  imports: [NimbusSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EjercicioComponent,
    EjercicioDetailComponent,
    EjercicioUpdateComponent,
    EjercicioDeleteDialogComponent,
    EjercicioDeletePopupComponent
  ],
  entryComponents: [EjercicioDeleteDialogComponent]
})
export class NimbusEjercicioModule {}
