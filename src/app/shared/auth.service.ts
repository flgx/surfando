import { Component, OnInit, Injectable,Inject } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

export class AuthService {
  private authState: Observable<firebase.User>
  private currentUser: firebase.User = null;
constructor(@Inject(AngularFireAuth) public afAuth: AngularFireAuth) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }
  getAuthState() {
    return this.authState;
  }
}