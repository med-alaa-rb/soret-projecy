import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../http.service";

@Component({
  selector: "app-marker-pop",
  templateUrl: "./marker-pop.component.html",
  styleUrls: ["./marker-pop.component.scss"],
})
export class MarkerPopComponent implements OnInit {
  constructor(private _http: HttpService) {}

  ngOnInit() {
    console.log(this._http.markerComponentData);
  }
}
