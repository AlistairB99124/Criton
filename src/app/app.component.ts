import { Component } from '@angular/core';
import { AppViewModel, GoogleResult } from './app.models'; 
import { ApiService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: AppViewModel;
  constructor (private apiService: ApiService) {
    this.data = {} as AppViewModel;
    this.data.baseGoogleUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    this.data.googleApiKey = 'AIzaSyCzFMK6zkb2oP5XBR8wjCH24CdJFIiPkXs';
    this.data.errorMessage = '';
  }

  onAddressChange = () => {
    if (this.data.address.length < 6) {
      this.data.errorMessage = 'Address is too short';
      return;
    }
    this.apiService.get(this.data.baseGoogleUrl + this.data.address.replace(' ', '+') + '&key=' + this.data.googleApiKey).then((res: GoogleResult) => {
      switch (res.status){
        case 'OK':
          this.data.latitude = res.results[0].geometry.location.lat;
          this.data.longitude = res.results[0].geometry.location.lng;
          this.data.errorMessage = '';
        break;
        case 'OVER_QUERY_LIMIT':
          this.data.errorMessage = 'Requests Exceeded';
        break;
        case 'ZERO_RESULTS':
          this.data.errorMessage = 'No Results Found';
        break;
        case 'OVER_DAILY_LIMIT':
          this.data.errorMessage = 'Daily Usage Exceeded';
        break;
        case 'REQUEST_DENIED':
          this.data.errorMessage = 'You do not have permission';
        break;
        case 'INVALID_REQUEST':
          this.data.errorMessage = 'Request was not valid';
        break;
        case 'UNKNOWN_ERROR':
          this.data.errorMessage = 'An Error Occured';
        break;
        default:
          this.data.errorMessage = '';
        break;
      }
    });
  }
}
