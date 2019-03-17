import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MapComponent} from './modules/interactive-map/components/map/map.component';
import {DataListComponent} from './modules/interactive-map/components/data-list/data-list.component';
import {ActiveListComponent} from './modules/interactive-map/components/active-list/active-list.component';
import {TotalPageComponent} from './modules/interactive-map/pages/total-page/total-page.component';
import {InteractiveMapService} from "./modules/interactive-map/interactive-map.service";


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    DataListComponent,
    ActiveListComponent,
    TotalPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [InteractiveMapService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
