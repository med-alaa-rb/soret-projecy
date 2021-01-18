import { Component } from "@angular/core";
import { Router } from "@angular/router";
import * as L from "leaflet";
import {
  NativeGeocoder,
  NativeGeocoderOptions,
} from "@ionic-native/native-geocoder/ngx";
import { HttpService } from "../../http.service";
import { AlertController } from "@ionic/angular";
import { PopoverController } from "@ionic/angular";
import { SearchDetailComponent } from "../../component/search-detail/search-detail.component";

@Component({
  selector: "app-search-map",
  templateUrl: "./search-map.page.html",
  styleUrls: ["./search-map.page.scss"],
})
export class SearchMapPage {
  myMap: any;
  stopName: any;

  constructor(
    private geocoder: NativeGeocoder,
    private router: Router,
    private _http: HttpService,
    public alertController: AlertController,
    public popoverController: PopoverController
  ) {}

  async ionViewDidEnter() {
    await this.loadMap([35.5, 10]);
  }

  loadMap(arr) {
    this.myMap ? this.myMap.remove() : this.myMap;
    this.myMap = new L.Map("mapId3").setView(arr, 11.6);
    L.tileLayer(
      "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=64a154b4ff5b439b9f0329ff92860ff3",
      {
        attribution:
          'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      }
    ).addTo(this.myMap);
  }

  async back() {
    this.router.navigateByUrl("/home");
  }

  async search(x) {
    !x
      ? this.loadMap([35.5, 10])
      : this._http.fetchFromCitiesApi(x).subscribe((res) => {
          console.log(res);
          if (res != []) {
            this.loadMap([res[0].stop_lat, res[0].stop_lon]);
            this.addStops(res, 0);
          }
        });
  }

  async addStops(arr, i) {
    if (!arr) {
      return;
    } else if (arr[i]) {
      await L.marker([arr[i].stop_lat, arr[i].stop_lon], {
        icon: L.icon({
          iconUrl: "../../../assets/icon/location-marker.png",
          iconSize: [40, 40],
        }),
        draggable: false,
      })
        .on("click", () => this.presentAlertMultipleButtons(arr[i]))
        .bindPopup(`<h5>${arr[i].stop_name}</h5>`)
        .openPopup()
        .addTo(this.myMap);
      if (arr[i++]) {
        this.addStops(arr, i++);
      } else {
        return;
      }
    }
  }

  async presentAlertMultipleButtons(el) {
    console.log(el);
    this.stopName = el;
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: this.stopName.stop_name,
      message: "how to reach ?",
      buttons: [
        "Cancel",
        { text: "Open Modal", handler: () => this.presentPopover() },
      ],
    });
    await alert.present();
  }

  async presentPopover() {
    await this._http
      .searchTripDestination(this.stopName.stop_id)
      .subscribe((res) => {
        console.log(res);
      });
    const popover = await this.popoverController.create({
      component: SearchDetailComponent,
      cssClass: "pop",
      translucent: true,
    });
    return await popover.present();
  }
}
