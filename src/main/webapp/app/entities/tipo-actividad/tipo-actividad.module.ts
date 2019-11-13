import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NimbusSharedModule } from 'app/shared/shared.module';
import { TipoActividadComponent } from './tipo-actividad.component';
import { TipoActividadDetailComponent } from './tipo-actividad-detail.component';
import { TipoActividadUpdateComponent } from './tipo-actividad-update.component';
import { TipoActividadDeletePopupComponent, TipoActividadDeleteDialogComponent } from './tipo-actividad-delete-dialog.component';
import { tipoActividadRoute, tipoActividadPopupRoute } from './tipo-actividad.route';

const ENTITY_STATES = [...tipoActividadRoute, ...tipoActividadPopupRoute];

@NgModule({
  imports: [NimbusSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoActividadComponent,
    TipoActividadDetailComponent,
    TipoActividadUpdateComponent,
    TipoActividadDeleteDialogComponent,
    TipoActividadDeletePopupComponent
  ],
  entryComponents: [TipoActividadDeleteDialogComponent]
})
export class NimbusTipoActividadModule {}
