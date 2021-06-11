import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CovidstatService } from './services/covidstat.service';
import { ReportByCountryNameResponse } from './models/ReportByCountryNameResponse';
import { forkJoin, Observable, pipe } from 'rxjs';
import { delay, map, retryWhen, switchMap, takeLast } from 'rxjs/operators';
import { province } from './models/province';
import { CountriesService } from './services/countries.service';
import { CountriesResponse } from './models/countriesresponse';
import { multi } from './models/chart-data';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Chart, Series } from './models/chart-model';
import { ChartConfig } from './appconfig/ChartConfig';
import { ThrowStmt } from '@angular/compiler';
import { ApiKeyService } from './services/api-key.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  country = 'Italy';
  date = '2020-04-01';

  statisticsData?: any = {};
  countries: CountriesResponse[] = [];
  chartConfig: any = {};
  chartData: Chart[] = [];
  isKeyExist: boolean = false;

  constructor(
    private covidStatService: CovidstatService,
    private countriesService: CountriesService,
    private apiKeyService: ApiKeyService
  ) {}

  ngAfterViewInit(): void {}

  ngOnInit() {
    this.renderChartWithConfiguration();
    this.isKeyExist = this.apiKeyService.isApiKeyExist();
    if (this.isKeyExist) {
      this.getReportByCountryName(this.country, this.date);
      setTimeout(() => {
        this.getListOfCountries();
      }, 3000);
    }
  }

  saveApiKey(value: any) {
    let key = value;
    let result = this.apiKeyService.saveApiKey(key);
    if (result) this.postLoadActions();
  }

  postLoadActions() {
    this.getReportByCountryName(this.country, this.date);
    setTimeout(() => {
      this.getListOfCountries();
    }, 3000);
  }

  hasApiKey() {
    return this.apiKeyService.isApiKeyExist();
  }

  renderChartWithMockData() {
    this.getChartMockData().forEach((element) => {
      this.chartData.push(element);
    });
  }

  renderChartWithConfiguration() {
    var config = new ChartConfig();
    Object.assign(this.chartConfig, config);
  }

  getReportByCountryName(country: string, date: string) {
    this.covidStatService
      .getStatsByCountry(country, date)
      .pipe(
        map((res) => {
          this.prepareCardData(res);
          this.prepareChartData(res);
        })
      )
      .subscribe((res) => {});
  }

  prepareCardData(res: any[]) {
    for (let index = 0; index < res.length; index++) {
      this.statisticsData.country = res[index].country;

      this.statisticsData.date = res[index].date;
      this.statisticsData.latitude = res[index].latitude;
      this.statisticsData.longitude = res[index].longitude;

      this.statisticsData.active = res[index].provinces[index].active;
      this.statisticsData.recovered = res[index].provinces[index].recovered;
      this.statisticsData.deaths = res[index].provinces[index].deaths;
    }
  }

  prepareChartData(res: any[]) {
    let items: Chart[] = [];
    let activeCases: Chart;
    let confirmedCases: Chart;
    let recoveredCases: Chart;
    let deathCases: Chart;

    res.forEach((element, index) => {
      activeCases = {
        name: 'Active',
        series: [
          {
            name: '2021-06-01',
            value: 0,
          },
          {
            name: element.date,
            value: element.provinces[index].active,
          },
        ],
      };

      recoveredCases = {
        name: 'Recovered',
        series: [
          {
            name: '2021-06-01',
            value: 0,
          },
          {
            name: element.date,
            value: element.provinces[index].recovered,
          },
        ],
      };

      confirmedCases = {
        name: 'Confirmed',
        series: [
          {
            name: '2021-06-01',
            value: 0,
          },
          {
            name: element.date,
            value: element.provinces[index].confirmed,
          },
        ],
      };

      deathCases = {
        name: 'Deaths',
        series: [
          {
            name: '2021-06-01',
            value: 0,
          },
          {
            name: element.date,
            value: element.provinces[index].deaths,
          },
        ],
      };

      items.push(activeCases);
      items.push(recoveredCases);
      items.push(confirmedCases);
      items.push(deathCases);
    });
    this.chartData = [...items];
  }

  getListOfCountries() {
    this.countriesService
      .getListOfCountries()
      .subscribe((res: CountriesResponse[]) => {
        res.forEach((val) => {
          this.countries.push(val);
        });
      });
  }

  onCountrySelected(event: any) {
    this.country = event.target.value;
    this.getReportByCountryName(this.country, this.date);
  }

  onDateSelected(event: any) {
    this.date = event.target.value;
    this.getReportByCountryName(this.country, this.date);
  }

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getChartMockData() {
    let data = [];
    let sample: Chart = {
      name: 'Italy',
      series: [
        {
          name: '08-06-2021',
          value: 0,
        },
        {
          name: '09-06-2021',
          value: 400,
        },
        {
          name: '10-06-2021',
          value: 1200,
        },
      ],
    };

    let sample2: Chart = {
      name: 'Italy',
      series: [
        {
          name: '08-06-2021',
          value: 0,
        },
        {
          name: '09-06-2021',
          value: 200,
        },
        {
          name: '10-06-2021',
          value: 8200,
        },
      ],
    };

    data.push(sample);
    data.push(sample2);

    return data;
  }
}
