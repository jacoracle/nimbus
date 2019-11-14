import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NimbusSharedModule } from 'app/shared/shared.module';
import { PractitionerComponent } from './practitioner.component';
import { practitionerRoute } from './practitioner.route';

@NgModule({
  imports: [NimbusSharedModule, RouterModule.forChild(practitionerRoute)],
  declarations: [PractitionerComponent],
  entryComponents: [PractitionerComponent]
})
export class PractitionerModule {}
