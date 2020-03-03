import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';



@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,

  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authRequest = req.clone({
      setHeaders: {
        token: localStorage.getItem('token') || ''
      }
    });
    return next
      .handle(authRequest)

      .pipe(
        tap(
          (event: HttpEvent<any>) => {

            if (event instanceof HttpResponse) {
              /* de acuerdo al statos del response */
              switch (event.status) {
                /* Caso 200 para todas las consultas correctas*/
                case 200:
                  console.log('200-OK');
                  localStorage.setItem('token', event.body['token']);

                  break;
                case 201:
                  console.log('201-OK');
                  localStorage.setItem('token', event.body['token']);

                  break;
                /* Caso 202 cuando se realiza el logIn */
                case 202:
                  console.log(event);
                  console.log('202-loggeado');
                  localStorage.setItem('token', event.body['token']);

                  localStorage.setItem('idUsuario', event.body['body']['usuario']['id']);
                  console.log('Obtenemos el ID del usuario: ' + localStorage.getItem('idUsuario'));

                  this.authenticationService.isLoggedIn = true;
                  break;

                default:
                  console.log('No autorizado-by default');
                  this.authenticationService.isLoggedIn = false;
                  this.router.navigate(['/login']);
                  break;
              }
            }
          },
          (err: any) => {
            /* de acuerdo al statos del response */
            switch (err.status) {
              /* Caso 401 cuando el token no es valido */
              case 401:
                console.log('401 - No autorizado');
                this.authenticationService.isLoggedIn = false;
                break;

              case 402:
                console.log('402 - No autorizado');
                this.authenticationService.isLoggedIn = false;
                break;

              default:
                console.log('No autorizado');
                this.authenticationService.isLoggedIn = false;
                break;
            }

            console.log('error: ' + err);
            console.log('codigo de error: ' + err.status);
          }
        )
      );
  }
}
