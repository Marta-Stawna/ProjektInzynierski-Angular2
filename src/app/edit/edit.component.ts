import { Component, OnInit, Input } from '@angular/core';
import { CommunicationService } from "app/common/communication.service";
import { LoginService } from "app/common/login.service";
//import { NgZone, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  //ngZone: NgZone;

  private myReservations;
  reservation;
  private data;
  private userId;
  deleted : Number;

  constructor(private service:CommunicationService, private  userService : LoginService) { 
    this.myReservations= this.service.getReservations()
    console.log(this.myReservations);
  }


  /*removeReservation(reservation){
    this.service.removeReservation(reservation);
  }*/

  removeReservation(reservation){
   this.service.removeReservationData(this.userService.getSessionId, reservation).subscribe(removeRecervationData =>{this.removeRecervationData = removeRecervationData;console.log(removeRecervationData)});
   this.deleted = 1
   this.processWithinAngularZone();
   //etInterval(window.location.reload(), 5000);
   //this._router.renavigate()
   
  this.service.getReservationData(this.userService.getSessionId).subscribe(reservationData =>{this.reservationData = reservationData;console.log(reservationData)});
   //this.ngZone.runOutsideAngular(() => {
  //  location.reload();
//});
 }



private reservationData;
public sendRecervationData;
private removeRecervationData;
/*removereservation={
  sala:'A1-11',
  data:'01-05-2017',
  godzina:'11:45'
}*/
progress: number = 0;
label: string;

_increaseProgress(doneCallback: () => void) {
  this.progress += 1;
  console.log(`Current progress: ${this.progress}%`);
  
  if (this.progress < 100) {
    window.setTimeout(() => {
      this._increaseProgress(doneCallback);
    }, 10);
  } else {
    doneCallback();
}
}

		processWithinAngularZone() {
    this.label = 'inside';
    this.progress = 0;
    this._increaseProgress(() => console.log('Inside Done!'));
  }


  ngOnInit() {
     let sessionId = this.userService.getSessionId();
     this.service.getUserId(sessionId).subscribe(userId =>this.userId = userId);
    /** this.userService.getUserData(sessionId).subscribe(data =>this.data = data);*/

    this.service.getReservationData(sessionId).subscribe(reservationData =>{this.reservationData = reservationData;console.log(reservationData)});
   //this.service.removeReservationData(sessionId,this.removereservation).subscribe(removeRecervationData =>{this.removeRecervationData = removeRecervationData;console.log(removeRecervationData)});

    this.reservation= this.service.getReservtion();
    if(this.reservation) this.myReservations.push(this.reservation);
  }
}