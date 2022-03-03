import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyDataService {
  constructor(
    private http: HttpClient
  ) { }

  fetchData(locationName: string) {
    return this.http.get
      (`https://api.openweathermap.org/data/2.5/weather?q=${locationName}&units=metric&appid=8eb824b6536aaa6ebf30ed5d56bf6d9a`)
      .pipe(catchError(errorRes => {
        return throwError(errorRes);
      })
      );
  }

  getTime(locationName: string, country: string) {
    return this.http.get
      (`https://api.ipgeolocation.io/timezone?apiKey=964134e7182346409b9e4fe3bc4f61f4&location=${locationName}`) /* ,${country}   <- is optional, could be a source of error */
      .pipe(catchError(errorRes => {
        return throwError(errorRes);
      })
      );
  }
}

