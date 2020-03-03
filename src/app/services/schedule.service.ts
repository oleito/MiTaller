import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private apiService: ApiService) { }

  getScheduleData() {
    return this.apiService.getData('app/traza');
  }
}
