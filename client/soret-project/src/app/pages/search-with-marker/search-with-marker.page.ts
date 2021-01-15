import { Component } from "@angular/core";
import { Router } from "@angular/router";
import * as L from "leaflet";
import {
  NativeGeocoder,
  NativeGeocoderOptions,
} from "@ionic-native/native-geocoder/ngx";
import { HttpService } from "../../http.service";

@Component({
  selector: "app-search-with-marker",
  templateUrl: "./search-with-marker.page.html",
  styleUrls: ["./search-with-marker.page.scss"],
})
export class SearchWithMarkerPage {
  myMap: any;
  newMarker: any;
  position: any;

  constructor(
    private geocoder: NativeGeocoder,
    private _http: HttpService,
    private router: Router
  ) {}

  async ionViewDidEnter() {
    await this.loadMap();
  }

  async loadMap() {
    if (this.myMap) {
      this.myMap;
    } else {
      this.myMap = await new L.Map("mapId4");
      L.tileLayer(
        "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=64a154b4ff5b439b9f0329ff92860ff3",
        {
          attribution:
            'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        }
      ).addTo(this.myMap);
      await this.myMap
        .locate({ setView: true, maxZoom: 12 })
        .on("locationfound", (e: any) => {
          this.newMarker = L.marker([e.latitude, e.longitude], {
            draggable: true,
          }).addTo(this.myMap);
          this.myMap.setView([e.latitude, e.longitude], 8);
          this.newMarker
            .bindPopup(
              `<h4>You are located here!</h4> <ion-button (click) = "func()">click</ion-button>`
            )
            .openPopup();
          // this.newMarker.on("dragend", () => {
          //   this.position = this.newMarker.getLatLng();
          // });
        });
    }
  }

  async back() {
    this.router.navigateByUrl("/home");
  }


}
