import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CameraPage } from './camera';
import { CameraPageRoutingModule } from './camera-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CameraPageRoutingModule
  ],
  declarations: [
    CameraPage,
  ]
})
export class CameraModule implements OnInit {

  
  ngOnInit() {

  }
}
