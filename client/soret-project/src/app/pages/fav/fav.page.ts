import { Component } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import * as L from "leaflet";
import {
  NativeGeocoder,
  NativeGeocoderOptions,
} from "@ionic-native/native-geocoder/ngx";
import { HttpService } from "../../http.service";
import { MarkerPopComponent } from "../../component/marker-pop/marker-pop.component";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-fav",
  templateUrl: "./fav.page.html",
  styleUrls: ["./fav.page.scss"],
})
export class FavPage {
  myMap: any;
  newMarker: any;
  address: any;
  stops: any;
  circle: any;
  layerName: any;

  constructor(
    private geocoder: NativeGeocoder,
    private router: Router,
    private _http: HttpService,
    public popoverController: PopoverController
  ) {}

  async ionViewDidEnter() {
    await this.loadMap();
    this._http.getStops().subscribe((res) => {
      this.addStops(res, 0);
    });
  }

  loadMap() {
    this.myMap = new L.Map("mapId1");
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    }).addTo(this.myMap);
    this.myMap
      .locate({ setView: true, maxZoom: 16 })
      .on("locationfound", (e: any) => {
        this.newMarker = L.marker([e.latitude, e.longitude], {
          draggable: true,
        }).addTo(this.myMap);
        this.myMap.setView([e.latitude, e.longitude], 13);
        this.newMarker.bindPopup("You are located here!").openPopup();
        // this.getAddress(e.latitude, e.longitude);
        // this.newMarker.on("dragend", () => {
        //   const position = this.newMarker.getLatLng();
        //    this.getAddress(position.lat, position.lng);
        // });
      });
  }

  //The function below is added
  getAddress(lat: number, long: number) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };
    this.geocoder.reverseGeocode(lat, long, options).then((results) => {
      this.address = Object.values(results[0]).reverse();
      console.log(this.address);
    });
  }
  async addStops(arr, i) {
    await L.marker([arr[i].stop_lat, arr[i].stop_lon], {
      draggable: false,
      opacity: 0.7,
    })
      .bindPopup(arr[i].stop_name)
      .openPopup()
      .on("click", () => this.markerClick(arr[i].stop_id))
      .addTo(this.myMap);
    if (!arr[i++].stop_name) {
      return;
    } else {
      this.addStops(arr, i++);
    }
  }
  async markerClick(id) {
    this._http.filterStops_times({ id: id }).subscribe((res) => {
      this._http.markerComponentData = res;
    });
    const popover = await this.popoverController.create({
      component: MarkerPopComponent,
      translucent: true,
    });
    return await popover.present();
  }
}
