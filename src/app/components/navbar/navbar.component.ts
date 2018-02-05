import { Component, OnInit, EventEmitter } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../shared/auth.service';
import {FirebaseService} from '../../services/firebase.service';

import { AngularFireAuth,AngularFireAuthModule} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import { Injectable,Inject } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  search:any;
  displayName:any;
  photoURL:any;
  email:any;
  userstate:any;
  listings:any;
  toggle:any;
  user: Observable <firebase.User>;
  constructor(@Inject(AngularFireAuth) public  afAuth: AngularFireAuth,private firebaseService: FirebaseService,
public af:AngularFireDatabase,
    public flashMessage:FlashMessagesService,
    ) 
    {
    this.user = afAuth.authState;
    this.search='';
    this.displayName='';
    this.photoURL='';
    this.email='';
    this.userstate= null;
    this.listings='';
    this.toggle = false;    
    afAuth.authState.subscribe((user: firebase.User) => {
    if(user != null){
 
    this.displayName = user.displayName;
    this.email = user.email;
    this.photoURL = user.photoURL;      
    }   
    });  
  }

  ngOnInit() {   
    this.user.subscribe(snapshot => this.userstate = snapshot);
  }
  toggleMenu(){
    this.toggle = !this.toggle;
    console.log(this.toggle);
  }
  login(){
  	  this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

  }
  logout(){
    this.afAuth.auth.signOut();
    this.flashMessage.show('You are logout', {cssClass:'alert-success',timeout: 3000});
  }

}
