import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchWithMarkerPage } from './search-with-marker.page';

const routes: Routes = [
  {
    path: '',
    component: SearchWithMarkerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchWithMarkerPageRoutingModule {}
