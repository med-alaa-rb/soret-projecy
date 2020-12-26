import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  markerComponentData: any = [];
  constructor(private http: HttpClient) {}
  ROOT_URL = "http://localhost:3000";

  //get shapes file
  getShapes() {
    return this.http.get(this.ROOT_URL + "/data/2020/shapes");
  }

  getStops() {
    return this.http.get(this.ROOT_URL + "/data/2020/stops");
  }

  filterStops_times(obj) {
    return this.http.post(this.ROOT_URL + "/data/2020/stop_times", obj);
  }
}
