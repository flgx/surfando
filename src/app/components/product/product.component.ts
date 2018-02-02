import { Component, OnInit,HostBinding} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { routerTransition } from '../../router.animations';
import { slideInDownAnimation } from '../../animations';

import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  id:any;
  product: any;
  imageUrls: ImageUrl[] = [];
  images:any;
  image;
  count:any;
  path:any;
  deleted:any;
  constructor(
    private firebaseService: FirebaseService,
    private router:Router,
    public af:AngularFireDatabase,
    private route:ActivatedRoute,    
    private flashMessage:FlashMessagesService
    ) { }

  ngOnInit() {
    // Get ID
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getProductDetails(this.id).subscribe(product => {
      this.product = product;
    });
    this.imageUrls = []; 
    this.firebaseService.getProductImages(this.id).subscribe(images => { 
      this.images = images;
      for(var i = 0;i<images.length;i++){
        let image = images[i];
        var string = image.path;
        var substring = "productimages";
          let storageRef = firebase.storage().ref();
          let spaceRef = storageRef.child(image.path);
          storageRef.child(image.path).getDownloadURL().then((url) => {
          console.log('hola'); console.log(url);

        // Set image url
        this.imageUrls.push(new ImageUrl(image.$key,url));
        
      }).catch((error) => {
        console.log(error);
      });   
  }
});
  }

  onDeleteProp(){ 
    this.firebaseService.getProductImages(this.id).subscribe(images => { 
      this.images = images;
      for(var i = 0; i<images.length;i++){

        let image = images[i];
        let storageRef = firebase.storage().ref();
      let spaceRef = storageRef.child(image.path);// Delete the file      
      this.firebaseService.deleteImage(image.$key);
      spaceRef.delete().then(function() {
      }).catch(function(error) {
        // Uh-oh, an error occurred!
      });      
    }
  });
    this.firebaseService.deleteProduct(this.id);
    this.flashMessage.show('Property deleted!' , {cssClass:'alert-danger',timeout: 6000});
    this.router.navigate(['products']);
  }

  onDeleteImage(propid,id){
    this.firebaseService.deleteImage(id);
    this.flashMessage.show('Image deleted!' , {cssClass:'alert-danger',timeout: 6000});
    this.imageUrls = [];

  }

}
export class ImageUrl {
  url: string;
  id:string;
  constructor(_id:string,_url: string) {
   this.url = _url
   this.id = _id;
 }
}