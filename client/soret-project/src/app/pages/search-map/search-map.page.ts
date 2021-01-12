import { Component } from "@angular/core";
import { Router } from "@angular/router";
import * as L from "leaflet";
import {
  NativeGeocoder,
  NativeGeocoderOptions,
} from "@ionic-native/native-geocoder/ngx";
import { HttpService } from "../../http.service";
import { PopoverController } from "@ionic/angular";
import { SearchDetailComponent } from "../../component/search-detail/search-detail.component";

@Component({
  selector: "app-search-map",
  templateUrl: "./search-map.page.html",
  styleUrls: ["./search-map.page.scss"],
})
export class SearchMapPage {
  myMap: any;

  constructor(
    private geocoder: NativeGeocoder,
    private router: Router,
    private _http: HttpService,
    public popoverController: PopoverController
  ) {}

  async ionViewDidEnter() {
    await this.loadMap([35.5, 10]);
  }

  loadMap(arr) {
    this.myMap = new L.Map("mapId3").setView(arr, 7.6);
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

  async search(x) {
    this.myMap.remove();
    !x
      ? this.loadMap([35.5, 10])
      : await this._http.fetchFromCitiesApi(x).subscribe((res) => {
          console.log(res);
          res == []
            ? this.loadMap([35.5, 10])
            : this.loadMap([res[0].lat, res[0].lng]);
          this.addStops(res, 0);
        });
  }

  async addStops(arr, i) {
    if (!arr) {
      return;
    } else if (arr[i]) {
      await L.marker([arr[i].lat, arr[i].lng], {
        icon: L.icon({
          iconUrl: "../../../assets/icon/location-marker.png",
          iconSize: [20, 20],
        }),
        draggable: false,
      })
        .setPopupContent(`<h3>${arr[i].name}</h3>`)
        .openPopup()
        .on("click", () => this.popoverData(arr[i]))
        .addTo(this.myMap);
      if (arr[i++]) {
        this.addStops(arr, i++);
      } else {
        return;
      }
    }
  }

  async popoverData(obj) {
    console.log(obj);
    return await this.popoverController.create({
      component: SearchDetailComponent,
      cssClass: "my-custom-class",
      translucent: true,
    });
  }
}
