import { Component } from "@angular/core";
import { Router } from "@angular/router";
import * as L from "leaflet";
import {
  NativeGeocoder,
  NativeGeocoderOptions,
} from "@ionic-native/native-geocoder/ngx";
import { HttpService } from "../../http.service";
import { MarkerPopComponent } from "../../component/marker-pop/marker-pop.component";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-search-map",
  templateUrl: "./search-map.page.html",
  styleUrls: ["./search-map.page.scss"],
})
export class SearchMapPage {
  layerName: any;
  myMap: any;

  constructor(
    private geocoder: NativeGeocoder,
    private router: Router,
    private _http: HttpService,
    public popoverController: PopoverController
  ) {}

  async ionViewDidEnter() {
    await this.loadMap();
  }

  loadMap() {
    this.myMap = new L.Map("mapId3").setView([35.5, 10], 7.6);
    L.tileLayer(
      "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=64a154b4ff5b439b9f0329ff92860ff3",
      {
        attribution:
          'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      }
    ).addTo(this.myMap);
  }

  back() {
    this.router.navigateByUrl("/home");
  }

  search(x) {
    this._http.fetchFromCitiesApi(x).subscribe((res) => {
      this.ionViewDidEnter();
      this.addStops(res, 0);
    });
  }

  async addStops(arr, i) {
    if (!arr) {
      return;
    } else if (arr[i]) {
      this.layerName = await L.marker([arr[i].lat, arr[i].lng], {
        icon: L.icon({
          iconUrl: "../../../assets/icon/location-marker.png",
          iconSize: [20, 20],
        }),
        draggable: false,
      }).addTo(this.myMap);
      if (arr[i++].geonameId) {
        this.addStops(arr, i++);
      } else {
        return;
      }
    }
  }
}
