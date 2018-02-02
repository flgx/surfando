import { Component, OnInit, EventEmitter,Input, Output,HostBinding} from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

import {FirebaseService} from '../../services/firebase.service';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";

import {Router, ActivatedRoute, Params,ParamMap} from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import {Subject} from 'rxjs';
import { routerTransition } from '../../router.animations';
import { slideInDownAnimation } from '../../animations';

import { FlashMessagesService } from 'angular2-flash-messages';
@Component({   
  host: {
     '[@routeAnimation]': 'true'
   },
  selector: 'app-category',
  templateUrl: './category.component.html',  
  styleUrls: ['./category.component.css'],  
  animations: [ slideInDownAnimation ]
})
export class CategoryComponent implements OnInit {
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
  count:any;
  sub:any;  
  i:any;
  category:any;
  fakeimage:any;  
  constructor(
    private firebaseService: FirebaseService,
    private router:Router,
    public af:AngularFireDatabase,
    private route:ActivatedRoute,    
    private flashMessage:FlashMessagesService) {


  }

ngOnInit() {

    this.counter = 0; 

    var params;
    this.sub = this.route.paramMap
      .switchMap((params: ParamMap) =>
      this.firebaseService.getProductsByCategory(params.get('category'))).subscribe(products => {
      this.products = products;
      this.count = products.length;
    });;


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
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
export class ImageUrl {
  url: string;
  id:string;
  constructor(public _id:string,public _url: string) {
    
  }
}
