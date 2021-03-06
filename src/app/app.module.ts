import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { SQLitePorter } from "@ionic-native/sqlite-porter/ngx";
import { SQLite } from "@ionic-native/sqlite/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthModule } from "./auth/auth.module";
import { ComponentsModule } from "./components/components.module";
import { PopinfoComponent } from "./components/popinfo/popinfo.component";
import { DetallePageModule } from "./pages/informacion/detalle/detalle.module";
import { PipesModule } from "./pipes/pipes.module";
import { DataService } from "./services/data.service";
import { TokenInterceptor } from "./services/interceptores/token-interceptor.service";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [PopinfoComponent],
  
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule,
DetallePageModule,
    FormsModule,
    PipesModule,
  ],

  providers: [
    SQLite,
    SQLitePorter,
    DataService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
