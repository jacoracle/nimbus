import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NimbusSharedModule } from 'app/shared/shared.module';
import { PractitionerComponent } from './practitioner.component';
import { practitionerRoute } from './practitioner.route';
import { SectionComponent } from './../section/section.component';
import { SumComponent } from './sum/sum.component';
import { ComponentComponent } from './../component/component.component';
import { ComponentItemComponent } from './../component-item/component-item.component';
import { SumMultipleChoiceComponent } from './sum-multiple-choice/sum-multiple-choice.component';

@NgModule({
  imports: [NimbusSharedModule, RouterModule.forChild(practitionerRoute)],
  declarations: [
    PractitionerComponent,
    SectionComponent,
    SumComponent,
    ComponentComponent,
    ComponentItemComponent,
    SumMultipleChoiceComponent
  ],
  entryComponents: [PractitionerComponent, SumComponent, SumMultipleChoiceComponent]
})
export class PractitionerModule {}
