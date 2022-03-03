import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MyDataService } from '../services/my-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {


  constructor(
    private myDataService: MyDataService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  myData: any;
  locationName: string;
  error: null;
  isFetching = false;
  sunriseTime: string | number | Date;
  sunsetTimeToShow: string | number | Date;
  sunsetTime: string | number | Date;
  isDay: boolean;
  timeData: any;
  country: string;
  myTime: string | number | Date;

  fetchData() {
    const locationName = this.locationName;
    this.isFetching = true;
    this.myDataService.fetchData(locationName).subscribe((data) => {
      this.myData = data;
      this.sunriseTime = new Date(this.myData.sys.sunrise * 1000 + (this.myData.timezone * 1000 - 3600000));
      this.sunsetTimeToShow = new Date(this.myData.sys.sunset * 1000 + (this.myData.timezone * 1000 - 3600000));
      this.sunsetTime = new Date(this.myData.sys.sunset * 1000);
      this.myData.sunset_Time = this.sunsetTime.toLocaleTimeString();
      let currentDate = new Date();
      this.myData.isDay = (currentDate.getTime() < this.sunsetTime.getTime());
      this.isFetching = false;
      /* console.log(this.myData.timezone); */
      this.country = this.myData.sys.country;

    }, error => {
      this.isFetching = false;
      this.openSnackbar(error.status, error.name, error.statusText);
      console.log(error.name);
    });
  }

  getTime() {
    this.isFetching = true;
    this.myDataService.getTime(this.locationName, this.country).subscribe((data) => {
      this.timeData = data;
      this.myTime = this.timeData.date_time;
      /*       console.log(this.myTime);
            console.log(this.myData2.timezone); */
    }
      , error => {
        this.isFetching = false;
        this.openSnackbar(error.status, error.name, error.statusText);
        console.log(error.name);
      });
  }

  openSnackbar(errorName: string, errorStatus: string, errorStatusText: string) {
    this.snackBar.open(`Error: ${errorName} ${errorStatus} ${errorStatusText}`, 'Okay', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}
