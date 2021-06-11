import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CovidstatService } from './services/covidstat.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ApiKeyService } from './services/api-key.service';
import { ChartService } from './services/chart.service';
import { CountriesService } from './services/countries.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxChartsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [CovidstatService, ApiKeyService, ChartService, CountriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
