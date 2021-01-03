import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchMapPageRoutingModule } from './search-map-routing.module';

import { SearchMapPage } from './search-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchMapPageRoutingModule
  ],
  declarations: [SearchMapPage]
})
export class SearchMapPageModule {}
