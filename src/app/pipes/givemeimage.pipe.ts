import { Pipe, PipeTransform } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import * as firebase from 'firebase';
	

@Pipe({
  name: 'givemeimage'
})
export class GivemeimagePipe implements PipeTransform {
image:any;
result:any;  
count:any;
imageUrls:any = [];
constructor(private firebaseService?: FirebaseService) {
	this.image = '';
}
  returnImage(url){
    this.imageUrls.push(url);
     
    console.log(this.imageUrls.length);
  }
  transform(value:Array<any>, args?): any {
      if (value != null) {
        // Go call api to get poster.  
        var data = ''; 
        var that = this;
        this.firebaseService.getProductImages(value).subscribe(images => { 
          this.image = images[0];
          var img = this.image;
          if(img != null){
            let storageRef = firebase.storage().ref();
            let spaceRef = storageRef.child(img.path);
            storageRef.child(img.path).getDownloadURL().then(function(url) {
              that.returnImage(url);
              }).catch(function(error) {
                // Handle any errors
              });
          }             
        });

      }
  }

}
