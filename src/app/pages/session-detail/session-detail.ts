import { Component, OnInit } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';

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

  constructor(
    private dataProvider: ConferenceData,
    private userProvider: UserData,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    console.clear();
  }

  ionViewWillEnter() {
    this.idtraza = this.route.snapshot.paramMap.get('sessionId');

    // this.dataProvider.load().subscribe((data: any) => {
    //   if (data && data.schedule && data.schedule[0] && data.schedule[0].groups) {
    //     const sessionId = this.route.snapshot.paramMap.get('sessionId');

    //     console.log(sessionId);
    //     for (const group of data.schedule[0].groups) {
    //       if (group && group.sessions) {
    //         for (const session of group.sessions) {
    //           if (session && session.id === sessionId) {
    //             this.session = session;

    //             this.isFavorite = this.userProvider.hasFavorite(
    //               this.session.name
    //             );

    //             break;
    //           }
    //         }
    //       }
    //     }
    //   }
    // });

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

  async openSocial(network: string, fab: HTMLIonFabElement) {
    // const loading = await this.loadingCtrl.create({
    //   message: `Posting to ${network}`,
    //   duration: (Math.random() * 1000) + 500
    // });
    // await loading.present();
    // await loading.onWillDismiss();
    // fab.close();
  }
}
