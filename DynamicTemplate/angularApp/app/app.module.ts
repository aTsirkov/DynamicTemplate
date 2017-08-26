import { NgModule, Compiler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DynamicComponent } from './components/template.component';
import { AppService } from './services/app.services';
import { Parser } from './shared/parser.helpers';

@NgModule({
  imports: [BrowserModule, CommonModule, HttpModule],
  declarations: [ AppComponent, DynamicComponent ],
  providers:    [ Compiler, AppService, Parser ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
