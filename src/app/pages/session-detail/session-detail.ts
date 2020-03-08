import { Component, OnInit } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { ApiService } from '../../services/api.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'page-session-detail',
  styleUrls: ['./session-detail.scss'],
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage implements OnInit {
  session: any;
  isFavorite = false;
  defaultHref = '';
  idtraza: any;
  piezas: any = [];
  datos: any = [];

  constructor(
    private dataProvider: ConferenceData,
    private userProvider: UserData,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }
  ngOnInit() {
    console.clear();

  }

  ionViewWillEnter() {
    this.idtraza = this.route.snapshot.paramMap.get('sessionId');
    console.log(this.idtraza);
    this.updateDatos();
    this.updatePiezas();

  }

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/schedule`;
  }

  sessionClick(item: string) {
    console.log('Clicked', item);
  }

  toggleFavorite() {
    if (this.userProvider.hasFavorite(this.session.name)) {
      this.userProvider.removeFavorite(this.session.name);
      this.isFavorite = false;
    } else {
      this.userProvider.addFavorite(this.session.name);
      this.isFavorite = true;
    }
  }

  shareSession() {
    console.log('Clicked share session');
  }

  openSocial() {
    console.log('openSocial');
  }
  updatePiezas() {
    this.getPiezasByTraza(this.idtraza).subscribe(
      (res: HttpResponse<any>) => {
        this.piezas = res.body;
      }
    );
  }
  updateDatos() {
    this.getDatosByTraza(this.idtraza).subscribe(
      (res: HttpResponse<any>) => {
        this.datos = res.body[0];
        console.log(this.datos);
      }
    );
  }

  getPiezasByTraza(idtraza) {
    return this.apiService.getData('traza/piezas?idtraza=' + idtraza);
  }

  getDatosByTraza(idtraza: number) {
    return this.apiService.getData('traza/datos?idtraza=' + idtraza);
  }
}
