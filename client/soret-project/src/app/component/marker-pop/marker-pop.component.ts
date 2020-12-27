import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { HttpService } from "../../http.service";
import { MbscFormOptions } from "@mobiscroll/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-marker-pop",
  templateUrl: "./marker-pop.component.html",
  styleUrls: ["./marker-pop.component.scss"],
})
export class MarkerPopComponent implements OnInit, AfterViewInit {
  constructor(private _http: HttpService, private router: Router) {}

  tripInfo: any;
  direction: any = "";
  data: any;
  trip: any;
  shape: any;

  @ViewChild("run1")
  r1: any;

  ngOnInit() {
    this.data = this._http.markerComponentData;
  }

  ngAfterViewInit() {}

  showTrip(id) {
    var obj = { id: id };
    this._http.fetchTrip(obj).subscribe((res) => {
      this.tripInfo = res[0];
      this.trip = this.tripInfo.trip_headsign;
      this.shape = this.tripInfo.shape_id;
      this.tripInfo.direction_id == 0
        ? (this.direction = "▻ aller ▻")
        : (this.direction = "◅ retour ◅");
    });
  }

  formSettings: MbscFormOptions = {
    theme: "material",
    themeVariant: "dark",
  };

  closeAll() {
    this.r1.instance.hide();
  }

  showAlltrip(id) {
    this._http.shapeId = id;
    this.router.navigateByUrl("/plans");
  }
}
