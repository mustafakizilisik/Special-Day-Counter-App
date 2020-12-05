import { ITimer } from '../model/itimer';
import {Component, Input} from '@angular/core';

@Component({
    selector: 'timer'
})
export class TimerComponent {
 
    @Input() timeInSeconds: number;
    public timer: ITimer;
 
    constructor() {
    }
 
    hasFinished() {
        return this.timer.hasFinished;
    }

initTimer(date: Date) {
    const now = Date.now();
     this.timeInSeconds = Math.abs(date.getTime() - now)/1000;
    if(!this.timeInSeconds) { this.timeInSeconds = 0; }
    this.timer = <ITimer>{
        seconds: this.timeInSeconds,
        runTimer: false,
        hasStarted: false,
        hasFinished: false,
        secondsRemaining: this.timeInSeconds
    };

    this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
    return this.timer.displayTime;
}

startTimer() {
    this.timer.hasStarted = true;
    this.timer.runTimer = true;
    this.timerTick();
}

pauseTimer() {
    this.timer.runTimer = false;
}

resumeTimer() {
    this.startTimer();
}

timerTick() {
    setTimeout(() => {
        if (!this.timer.runTimer) { return; }
        this.timer.secondsRemaining--;
        this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
        if (this.timer.secondsRemaining > 0) {
            this.timerTick();
        }
        else {
            this.timer.hasFinished = true;
        }
        console.log(this.timer.displayTime);
    }, 1000);
}

getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10);
    var day = Math.floor(sec_num / 86400);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    var dayString = '';
    if (hours > 23) {
      let a = day * 24;
      hours -= a;
    }
    dayString = (day < 10) ? "0" + day : day.toString();
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return dayString + ':' + hoursString + ':' + minutesString + ':' + secondsString;
}

}