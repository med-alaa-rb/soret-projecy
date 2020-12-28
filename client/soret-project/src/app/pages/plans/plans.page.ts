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
    await this.loadMap();
    var id = this._http.shapeId;
    await this._http.getShapes(id).subscribe((res) => {
      res ? this.addStops(res, 0) : this.router.navigateByUrl("fav");
      console.log(res);
    });
  }

  async loadMap() {
    if (this.plansMap) {
      await this.plansMap.remove();
      this.loadMap();
    } else {
      this.plansMap = await new L.Map("mapId2").setView([34, 9], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      }).addTo(this.plansMap);
    }
  }

  async addStops(arr, i) {
    this.layerName = await L.marker(
      [arr[i].shape_pt_lat, arr[i].shape_pt_lon],
      {
        draggable: false,
      }
    ).addTo(this.plansMap);
    if (!arr[i++].shape_pt_lat) {
      return;
    } else {
      this.addStops(arr, i++);
    }
  }
}
