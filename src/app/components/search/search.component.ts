import { Component, OnInit, EventEmitter,Input, Output,HostBinding} from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

import {FirebaseService} from '../../services/firebase.service';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
// for auth

import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import {Subject} from 'rxjs';
import { routerTransition } from '../../router.animations';
import { slideInDownAnimation } from '../../animations';

import { AngularFireAuth } from 'angularfire2/auth';

import { FlashMessagesService } from 'angular2-flash-messages';

import { Injectable,Inject } from '@angular/core';

@Component({   
  host: {
     '[@routeAnimation]': 'true'
   },
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [ slideInDownAnimation ]
})
export class SearchComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';
  products:any;
  search:any;
  imageUrls:any = [];
  imgSelected: any;
  counter:any;
  image:any;
  images:any;
  myimage:any;
  userstate:any;
  count:any;
  i:any;    
  fakeimage:any;  
  user: Observable <firebase.User>;
  @Input() inputObject:any;
  @Output() outputEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private firebaseService: FirebaseService,
    private router:Router,
    @Inject(AngularFireAuth) public  afAuth: AngularFireAuth,
    public af:AngularFireDatabase,
    private route:ActivatedRoute,    
    private flashMessage:FlashMessagesService) {
    this.user = afAuth.authState;
    this.firebaseService.getProducts().subscribe(products => {
      this.products = products;
      this.count = products.length;
      this.i = 0;
    });  
  }


ngOnInit() {

    this.counter = 0;
    this.user.subscribe(snapshot => this.userstate = snapshot);

    this.firebaseService.getProducts().subscribe(products => {
      let productsLength = products.length;
    });

 }

  login(){
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

  }
  returnImage(key,url){
   this.imageUrls.push(new ImageUrl(key,url));
  }
  searchProps(){    
    this.firebaseService.getProductsByTitle(this.search.toLowerCase()).subscribe(products => { 
      this.products = products;
    });
  }

getProductsByTitle(title){
  this.outputEvent.emit("Works");
  console.log('here');    
    this.firebaseService.getProductsByTitle(title.toLowerCase()).subscribe(products => { 
      this.products = products;
    }); 

}
getImageUrl(prodid) {
        // Go call api to get poster.  
        var data = ''; 
        var that = this;
        this.firebaseService.getProductImages(prodid).subscribe(images => { 
          this.image = images[0];
          var img = this.image;
          if(this.image != null){
            let storageRef = firebase.storage().ref();
            let spaceRef = storageRef.child(this.image.path);
            storageRef.child(img.path).getDownloadURL().then(function(url) {
              that.returnImage(img.$key,url);

              }).catch(function(error) {
                // Handle any errors
              });
          }             
        });
}

}
export class ImageUrl {
  url: string;
  id:string;
  constructor(public _id:string,public _url: string) {
    
  }
}