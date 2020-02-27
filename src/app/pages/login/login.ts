import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { HttpResponse } from '@angular/common/http';
import { tokenName } from '@angular/compiler';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    public storage: Storage
  ) { }

  onLogin(form: NgForm) {

    if (form.valid) {
      this.userData.login(this.login.username, this.login.password).subscribe((res: HttpResponse<any>) => {

        this.submitted = true;
        console.log('login correcto');
        console.log(res);
        console.log('redirecciona');
        this.router.navigateByUrl('/app/tabs/schedule');

        // console.log(res.['token']);
      }, err => {
        console.log('login incorrecto');
        console.log(err);
      });
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
