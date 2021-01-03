import { Component, ViewChild, OnInit } from "@angular/core";
import { HttpService } from "../../http.service";
import { MbscFormOptions } from "@mobiscroll/angular";
import { Router } from "@angular/router";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-marker-pop",
  templateUrl: "./marker-pop.component.html",
  styleUrls: ["./marker-pop.component.scss"],
})
export class MarkerPopComponent implements OnInit {
  constructor(
    private _http: HttpService,
    private router: Router,
    public popoverController: PopoverController
  ) {}

  tripInfo: any;
  direction: any = "";
  data: any;
  trip: any;
  shape: any;

  @ViewChild("run1")
  r1: any;

  ngOnInit() {
    this.data = this._http.markerComponentData;
    console.log(this.data)
  }


  showTrip(id) {
    var obj = { id: id };
    this._http.fetchTrip(obj).subscribe((res) => {
      console.log(res)
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
    console.log(id)
    this._http.shapeId = id;
    this.router.navigateByUrl("/plans");
    this.popoverController.dismiss()
  }
}
