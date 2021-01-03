import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchMapPage } from './search-map.page';

const routes: Routes = [
  {
    path: '',
    component: SearchMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchMapPageRoutingModule {}
