import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { HomePageRoutingModule } from "./home-routing.module";

import { HomePage } from "./home.page";

import { SlidesComponent } from "../../component/slides/slides.component";

import { SearchDestinationComponent } from "../../component/search-destination/search-destination.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [HomePage, SlidesComponent, SearchDestinationComponent],
})
export class HomePageModule {}
