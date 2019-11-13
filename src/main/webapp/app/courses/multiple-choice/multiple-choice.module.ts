import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NimbusSharedModule } from 'app/shared/shared.module';
import { MultipleChoiceComponent } from './multiple-choice.component';
import { multipleChoiceRoute } from './multiple-choice.route';

@NgModule({
  imports: [NimbusSharedModule, RouterModule.forChild(multipleChoiceRoute)],
  declarations: [MultipleChoiceComponent]
})
export class MultipleChoiceModule {}
