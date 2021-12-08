import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { PopinfoComponent } from './components/popinfo/popinfo.component';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [PopinfoComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,ComponentsModule,HttpClientModule,PipesModule],
  providers: [
    StatusBar,
   SQLite,
   SQLitePorter,
    SplashScreen,
     
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
