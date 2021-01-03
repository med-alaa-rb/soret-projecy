import { Component } from "@angular/core";
import { Router } from "@angular/router";
import * as L from "leaflet";
import { NativeGeocoder } from "@ionic-native/native-geocoder/ngx";
import { HttpService } from "../../http.service";

@Component({
  selector: "app-plans",
  templateUrl: "./plans.page.html",
  styleUrls: ["./plans.page.scss"],
})
export class PlansPage {
  layerName: any;
  plansMap: any;
  newMarker: any;

  constructor(
    public geocoder: NativeGeocoder,
    public router: Router,
    public _http: HttpService
  ) {}

  async ionViewDidEnter() {
    if (this.plansMap) {
      this.plansMap.unsubscribe();
    }
    this.loadMap();
    var id = this._http.shapeId;
    await this._http.getShapes(id).subscribe((res) => {
      console.log(res[0])
      res ? this.addStops(res, 0) : this.router.navigateByUrl("fav");
    });
  }

  async loadMap() {
    this.plansMap = await new L.Map("mapId2").setView([35.5, 10], 7.6);
    L.tileLayer(
      "https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=64a154b4ff5b439b9f0329ff92860ff3",
      {
        attribution:
          'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 9,
        minZoom: 9,
      }
    ).addTo(this.plansMap);
  }

  async addStops(arr, i) {
    !arr
      ? this.loadMap()
      : (this.layerName = await L.marker(
          [arr[i].shape_pt_lat, arr[i].shape_pt_lon],
          {
            icon: L.icon({
              iconUrl: "../../../assets/icon/custom-marker-icon.png",
              iconSize: [9, 9],
            }),
            draggable: false,
          }
        ).addTo(this.plansMap));
    if (!arr[i++].shape_pt_lat) {
      return;
    } else {
      this.addStops(arr, i++);
    }
  }
}
