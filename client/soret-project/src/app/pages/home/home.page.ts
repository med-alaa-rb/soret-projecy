import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { HttpService } from "../../http.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  constructor(
    private router: Router,
    private geolocation: Geolocation,
    public _http: HttpService
  ) {}

  ngOnInit() {
    this.getUserPostion();
  }

  getUserPostion() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this._http.userLocation = {
          lat: resp.coords.latitude,
          lon: resp.coords.longitude,
        };
        console.log(this._http.userLocation);
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
  }

  goToSearch() {
    this.router.navigateByUrl("search-map");
  }
  useMarker() {
    this.router.navigateByUrl("search-with-marker");
  }
}
