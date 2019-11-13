import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NimbusSharedModule } from 'app/shared/shared.module';
import { ComponenteComponent } from './componente.component';
import { ComponenteDetailComponent } from './componente-detail.component';
import { ComponenteUpdateComponent } from './componente-update.component';
import { ComponenteDeletePopupComponent, ComponenteDeleteDialogComponent } from './componente-delete-dialog.component';
import { componenteRoute, componentePopupRoute } from './componente.route';

const ENTITY_STATES = [...componenteRoute, ...componentePopupRoute];

@NgModule({
  imports: [NimbusSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ComponenteComponent,
    ComponenteDetailComponent,
    ComponenteUpdateComponent,
    ComponenteDeleteDialogComponent,
    ComponenteDeletePopupComponent
  ],
  entryComponents: [ComponenteDeleteDialogComponent]
})
export class NimbusComponenteModule {}
