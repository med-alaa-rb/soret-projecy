import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "plans",
    loadChildren: () =>
      import("./pages/plans/plans.module").then((m) => m.PlansPageModule),
  },
  {
    path: "fav",
    loadChildren: () =>
      import("./pages/fav/fav.module").then((m) => m.FavPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'search-map',
    loadChildren: () => import('./pages/search-map/search-map.module').then( m => m.SearchMapPageModule)
  },  {
    path: 'search-with-marker',
    loadChildren: () => import('./pages/search-with-marker/search-with-marker.module').then( m => m.SearchWithMarkerPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
