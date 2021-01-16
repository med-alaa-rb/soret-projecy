import { FormsModule } from "@angular/forms";
import { MbscModule } from "@mobiscroll/angular";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { NativeGeocoder } from "@ionic-native/native-geocoder/ngx";
import { HttpClientModule } from "@angular/common/http";
import { MarkerPopComponent } from "./component/marker-pop/marker-pop.component";
import { Geolocation } from "@ionic-native/geolocation/ngx";

@NgModule({
  declarations: [AppComponent, MarkerPopComponent],
  entryComponents: [],
  imports: [
    FormsModule,
    MbscModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
