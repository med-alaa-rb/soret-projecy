import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../http.service";

@Component({
  selector: "app-search-detail",
  templateUrl: "./search-detail.component.html",
  styleUrls: ["./search-detail.component.scss"],
})
export class SearchDetailComponent implements OnInit {
  constructor(public _http: HttpService) {}

  ngOnInit() {
    this._http.postUserLocation(this._http.userLocation).subscribe((res) => {
     res? console.log(res) : res
    });
  }
}
