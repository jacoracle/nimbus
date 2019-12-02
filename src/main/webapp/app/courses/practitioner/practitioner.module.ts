import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NimbusSharedModule } from 'app/shared/shared.module';
import { PractitionerComponent } from './practitioner.component';
import { practitionerRoute } from './practitioner.route';
import { SectionComponent } from './../section/section.component';
import { SumComponent } from './sum/sum.component';
import { ComponentComponent } from './../component/component.component';
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { VgBufferingModule } from 'videogular2/compiled/buffering';

@NgModule({
  imports: [
    NimbusSharedModule,
    RouterModule.forChild(practitionerRoute),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  declarations: [PractitionerComponent, SectionComponent, SumComponent, ComponentComponent],
  entryComponents: [PractitionerComponent]
})
export class PractitionerModule {}
