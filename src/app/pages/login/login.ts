import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { HttpResponse } from '@angular/common/http';
import { tokenName } from '@angular/compiler';
import { AuthenticationService } from '../../services/authentication.service';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {

  HAS_LOGGED_IN = 'hasLoggedIn';
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    private authenticationService: AuthenticationService,
    public userData: UserData,
    public router: Router,
    public storage: Storage
  ) { }

  onLogin(form: NgForm) {

    if (form.valid) {
      this.userData.login(this.login.username, this.login.password).subscribe((res: HttpResponse<any>) => {

        this.submitted = true;
        this.authenticationService.isLoggedIn = true;

        this.storage.set(this.HAS_LOGGED_IN, true);
        this.storage.set('username', this.login.username);

        this.router.navigateByUrl('/app/tabs/schedule');

      }, err => {
        console.log('login incorrecto');
        console.log(err);
      });
    } else {
      console.log('form invalid');
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
