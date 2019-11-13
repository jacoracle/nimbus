import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NimbusSharedModule } from 'app/shared/shared.module';
import { PaqueteComponent } from './paquete.component';
import { PaqueteDetailComponent } from './paquete-detail.component';
import { PaqueteUpdateComponent } from './paquete-update.component';
import { PaqueteDeletePopupComponent, PaqueteDeleteDialogComponent } from './paquete-delete-dialog.component';
import { paqueteRoute, paquetePopupRoute } from './paquete.route';

const ENTITY_STATES = [...paqueteRoute, ...paquetePopupRoute];

@NgModule({
  imports: [NimbusSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PaqueteComponent,
    PaqueteDetailComponent,
    PaqueteUpdateComponent,
    PaqueteDeleteDialogComponent,
    PaqueteDeletePopupComponent
  ],
  entryComponents: [PaqueteDeleteDialogComponent]
})
export class NimbusPaqueteModule {}
