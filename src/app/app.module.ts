import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ShareModule } from './module/share.module';

import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    IconsProviderModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ShareModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
