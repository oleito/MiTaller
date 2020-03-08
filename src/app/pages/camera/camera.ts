import { Component, OnInit } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { ApiService } from '../../services/api.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'page-camera',
  styleUrls: ['./camera.scss'],
  templateUrl: 'camera.html'
})
export class CameraPage implements OnInit {
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

    this.idtraza = this.route.snapshot.paramMap.get('sessionId');
    console.log(this.idtraza);
  }

}
