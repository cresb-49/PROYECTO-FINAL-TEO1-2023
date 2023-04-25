import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JuegoHanoiComponent } from './juegos/hanoi/juego-hanoi/juego-hanoi.component';
import { DiscoHanoiComponent } from './juegos/hanoi/disco-hanoi/disco-hanoi.component';
import { TorreHanoiComponent } from './juegos/hanoi/torre-hanoi/torre-hanoi.component';


@NgModule({
  declarations: [
    AppComponent,
    JuegoHanoiComponent,
    DiscoHanoiComponent,
    TorreHanoiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
