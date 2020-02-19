import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NimbusSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { VideoUploadComponent } from '../video-upload/video-upload.component';

@NgModule({
  imports: [NimbusSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent, VideoUploadComponent],
  entryComponents: []
})
export class NimbusHomeModule {}
