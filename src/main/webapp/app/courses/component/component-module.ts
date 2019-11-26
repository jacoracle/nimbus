import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NimbusSharedModule } from 'app/shared/shared.module';
import { ComponentComponent } from './component.component';

@NgModule({
  imports: [NimbusSharedModule],
  declarations: [ComponentComponent],
  entryComponents: [ComponentComponent]
})
export class ComponentModule {}
