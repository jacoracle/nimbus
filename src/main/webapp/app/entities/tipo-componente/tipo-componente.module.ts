import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NimbusSharedModule } from 'app/shared/shared.module';
import { TipoComponenteComponent } from './tipo-componente.component';
import { TipoComponenteDetailComponent } from './tipo-componente-detail.component';
import { TipoComponenteUpdateComponent } from './tipo-componente-update.component';
import { TipoComponenteDeletePopupComponent, TipoComponenteDeleteDialogComponent } from './tipo-componente-delete-dialog.component';
import { tipoComponenteRoute, tipoComponentePopupRoute } from './tipo-componente.route';

const ENTITY_STATES = [...tipoComponenteRoute, ...tipoComponentePopupRoute];

@NgModule({
  imports: [NimbusSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoComponenteComponent,
    TipoComponenteDetailComponent,
    TipoComponenteUpdateComponent,
    TipoComponenteDeleteDialogComponent,
    TipoComponenteDeletePopupComponent
  ],
  entryComponents: [TipoComponenteDeleteDialogComponent]
})
export class NimbusTipoComponenteModule {}
