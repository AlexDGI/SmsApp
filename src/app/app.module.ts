import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InicioModule } from './pages/inicio/inicio.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { InterceptorService } from './services/interceptor.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    InicioModule,
    FormsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {provide:HTTP_INTERCEPTORS, useClass:InterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
