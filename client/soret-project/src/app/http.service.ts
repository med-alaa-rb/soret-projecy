import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  shapeId: any;

  markerComponentData: any = [];

  constructor(private http: HttpClient) {}
  ROOT_URL = "http://localhost:3000";

  //get shapes file
  getShapes(id) {
    return this.http.get(this.ROOT_URL + `/data/2020/shapes/${id}`);
  }

  getStops() {
    return this.http.get(this.ROOT_URL + "/data/2020/stops");
  }

  filterStops_times(obj) {
    return this.http.post(this.ROOT_URL + "/data/2020/stop_times", obj);
  }
  fetchTrip(obj) {
    return this.http.post(this.ROOT_URL + "/data/2020/tripFetch", obj);
  }
  fetchFromCitiesApi(id) {
    return this.http.get(this.ROOT_URL + `/api/externe/cities/${id}`);
  }
}
