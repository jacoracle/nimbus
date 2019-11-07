import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { NimbusSharedModule } from 'app/shared/shared.module';
import { NimbusCoreModule } from 'app/core/core.module';
import { NimbusAppRoutingModule } from './app-routing.module';
import { NimbusHomeModule } from './home/home.module';
import { NimbusEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    NimbusSharedModule,
    NimbusCoreModule,
    NimbusHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    NimbusEntityModule,
    NimbusAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class NimbusAppModule {}
