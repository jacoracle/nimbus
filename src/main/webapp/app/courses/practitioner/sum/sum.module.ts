import { NgModule } from '@angular/core';

import { NimbusSharedModule } from 'app/shared/shared.module';
import { SumComponent } from './sum.component';

@NgModule({
  imports: [NimbusSharedModule],
  declarations: [],
  entryComponents: [SumComponent]
})
export class SumModule {}
