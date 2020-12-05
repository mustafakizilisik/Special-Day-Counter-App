import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService, Item } from '../services/storage.service';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { CardModel } from '../model/card-model';
import * as moment from 'moment';


@Component({
  selector: 'app-input',
  templateUrl: './input.page.html',
  styleUrls: ['./input.page.scss'],
})
export class InputPage {

  id: number;
  inputName: string;
  inputDate: Date;
  inputType: string;
  year: number;
  month: number;
  day: number;
  keys: string[];
  cardModel: CardModel;
  cardModelList: CardModel[] = [];
  today = Date.now();

  constructor (
    private router: Router,
    public storage: Storage) { 
      this.storage.clear();
      
    }
    
    btnSave() {        
    this.cardModelList = [];
      this.storage.get('cards').then((value) => {
        if(value) {
          this.cardModelList = value;
        }
        this.cardModel = new CardModel();
        this.cardModel.title = this.inputName;
        this.cardModel.type = this.inputType;

        //var dayOfDate = this.inputDate.getDate();
        //var monthOfDate = this.inputDate.getMonth();
        //var yearOfDate = this.inputDate.getFullYear();
        //var dayMonthYear = dayOfDate + "-" + (monthOfDate+1) + "-" + yearOfDate;  
        //var newDate = new Date(dayMonthYear);
        //this.cardModel.date = newDate;
        
        this.cardModel.date = this.inputDate;
        if (this.cardModel.title==null || this.cardModel.type==null || this.cardModel.date==null) {
          return;
        }
        this.cardModelList.push(this.cardModel);
        this.storage.set('cards', this.cardModelList);
        this.router.navigate(['home']);
        console.log(this.cardModelList);
      });

    }
}
