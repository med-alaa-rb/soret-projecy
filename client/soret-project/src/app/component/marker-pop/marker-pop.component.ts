import { Component, ViewChild } from "@angular/core";
import { HttpService } from "../../http.service";
import { MbscFormOptions } from "@mobiscroll/angular";

@Component({
  selector: "app-marker-pop",
  templateUrl: "./marker-pop.component.html",
  styleUrls: ["./marker-pop.component.scss"],
})
export class MarkerPopComponent {
  
  constructor(private _http: HttpService) {}
  
  data : any = this._http.markerComponentData

  
  @ViewChild("run1")
  r1: any;

  showTrip(id) {
    var obj = { id: id };
    this._http.fetchTrip(obj).subscribe((res) => {
      console.log(res);
    });
  }

  formSettings: MbscFormOptions = {
    theme: "material",
    themeVariant: "dark",
  };

  closeAll() {
    this.r1.instance.hide();
  }
}
