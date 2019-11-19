import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NimbusSharedModule } from 'app/shared/shared.module';
import { SumComponent } from './sum.component';

@NgModule({
  imports: [NimbusSharedModule],
  declarations: [SumComponent],
  entryComponents: [SumComponent]
})
export class SumModule {}
