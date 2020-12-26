import { Component } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import * as L from "leaflet";
import {
  NativeGeocoder,
  NativeGeocoderOptions,
} from "@ionic-native/native-geocoder/ngx";
import { HttpService } from "../http.service";

@Component({
  selector: "app-pickup-location",
  templateUrl: "./pickup-location.page.html",
  styleUrls: ["./pickup-location.page.scss"],
})
export class PickupLocationPage {
  myMap: any;
  newMarker: any;
  address: any;
  stops: any;
  circle: any;
  layerName: any;

  constructor(
    private geocoder: NativeGeocoder,
    private router: Router,
    private _http: HttpService
  ) {}

  async ionViewDidEnter() {
    await this.loadMap();
    this._http.getShapes().subscribe((res) => {
      this.addStops(res, 5800, 6200);
    });
    this.locatePosition();
    // this.addToMap();
  }

  loadMap() {
    this.myMap = new L.Map("mapId").setView([17.385, 78.4867], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    }).addTo(this.myMap);
  }

  locatePosition() {
    this.myMap
      .locate({ setView: true, maxZoom: 16 })
      .on("locationfound", (e: any) => {
        this.newMarker = L.marker([e.latitude, e.longitude], {
          draggable: true,
        }).addTo(this.myMap);
        this.newMarker.bindPopup("You are located here!").openPopup();
        this.getAddress(e.latitude, e.longitude); // This line is added

        this.newMarker.on("dragend", () => {
          const position = this.newMarker.getLatLng();
          this.getAddress(position.lat, position.lng); // This line is added
        });
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
    });
  }

  async addStops(arr, i, size) {
    this.layerName = await L.marker(
      [arr[i].shape_pt_lat, arr[i].shape_pt_lon],
      {
        draggable: false,
      }
    )
      .bindPopup(arr[i].shape_id)
      .openPopup()
      .addTo(this.myMap);
    if (!arr[i++].shape_pt_lat) {
      return;
    } else if (i > size) {
      return;
    } else {
      this.addStops(arr, i++, size);
    }
  }
  // addToMap() {
  //   var hydMarker = new L.Marker([17.385044, 78.486671]);
  //   var vskpMarker = new L.Marker([17.686816, 83.218482]);
  //   var vjwdMarker = new L.Marker([16.506174, 80.648015]);

  //   this.layerName = [hydMarker, vskpMarker, vjwdMarker];
  //   console.log([hydMarker, vskpMarker]);
  //   // Creating layer group
  //   var layerGroup = L.layerGroup(this.layerName).addTo(this.myMap);
  //   // Adding layer group to map
  // }
}
