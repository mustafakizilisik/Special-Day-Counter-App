import { Component, Input, ViewChild } from '@angular/core';

import { Storage } from '@ionic/storage';
import { CardModel } from '../model/card-model';
import { TimerComponent } from '../model/timer';

import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  time : String;
  cardModelList: CardModel[];
  timeInSeconds: number;
  @ViewChild(TimerComponent) timer: TimerComponent;

  constructor(
    private router: Router,
    public storage: Storage) {
    this.storage.get('cards').then((value) => {
      this.cardModelList = value;
      console.log(this.cardModelList);
    });
   }
  //ngOnInit() {
  //}

  btnAdd() {
    this.router.navigate(['input']);
    this.storage.get('cards').then((value) => {
      this.cardModelList = value;
      console.log(this.cardModelList);
    });
  }

  getForFormat(format: String, date: Date) {
    this.time = this.timer.initTimer(date);
    console.log(this.time);
  }

}
