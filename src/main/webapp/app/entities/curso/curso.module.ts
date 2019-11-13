import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NimbusSharedModule } from 'app/shared/shared.module';
import { CursoComponent } from './curso.component';
import { CursoDetailComponent } from './curso-detail.component';
import { CursoUpdateComponent } from './curso-update.component';
import { CursoDeletePopupComponent, CursoDeleteDialogComponent } from './curso-delete-dialog.component';
import { cursoRoute, cursoPopupRoute } from './curso.route';

const ENTITY_STATES = [...cursoRoute, ...cursoPopupRoute];

@NgModule({
  imports: [NimbusSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CursoComponent, CursoDetailComponent, CursoUpdateComponent, CursoDeleteDialogComponent, CursoDeletePopupComponent],
  entryComponents: [CursoDeleteDialogComponent]
})
export class NimbusCursoModule {}
