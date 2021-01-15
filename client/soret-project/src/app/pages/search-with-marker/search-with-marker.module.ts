import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchWithMarkerPageRoutingModule } from './search-with-marker-routing.module';

import { SearchWithMarkerPage } from './search-with-marker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchWithMarkerPageRoutingModule
  ],
  declarations: [SearchWithMarkerPage]
})
export class SearchWithMarkerPageModule {}
