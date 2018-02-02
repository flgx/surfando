import { Component, OnInit,HostBinding } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { FlashMessagesService } from 'angular2-flash-messages';
import { routerTransition } from '../../router.animations';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { slideInDownAnimation } from '../../animations';

@Component({   
  host: {
     '[@routeAnimation]': 'true'
   },
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [ slideInDownAnimation ]
})
export class HomeComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';  
  user: Observable <firebase.User>;
  displayName:any;
  photoURL:any;
  email:any;
  constructor(
  	@Inject(AngularFireAuth) public afAuth:AngularFireAuth,
  	public flashMessage:FlashMessagesService,
  ) {       

    this.user = afAuth.authState;
    afAuth.authState.subscribe((user: firebase.User) => {
    this.displayName = user.displayName;
    this.email = user.email;
    this.photoURL = user.photoURL;
    });  
}

  ngOnInit() {
  }

  login(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }


}
