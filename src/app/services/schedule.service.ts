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

  filterSession(
    session: any,
    queryWords: string[],
  ) {
    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (session.traza_patente && session.traza_patente.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
        if(session.vhModelo && session.vhModelo.toLowerCase().indexOf(queryWord) > -1){
          matchesQueryText = true;
        }
        if(session.vhMarca && session.vhMarca.toLowerCase().indexOf(queryWord) > -1){
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    session.hide = !(matchesQueryText);
  }
}
