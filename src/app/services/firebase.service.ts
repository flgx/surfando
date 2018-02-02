import { Injectable } from '@angular/core';
import { AngularFireDatabase,FirebaseObjectObservable,FirebaseListObservable } from "angularfire2/database-deprecated";
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import { Ng2ImgMaxService } from 'ng2-img-max';

import 'rxjs/add/operator/map';
@Injectable()
export class FirebaseService {
  products:FirebaseListObservable<Product[]>;
  product:FirebaseObjectObservable<Product>;
  image:FirebaseObjectObservable<Image>;
  images:FirebaseListObservable<Image[]>;
  myproducts:any;
  folder:any;
  folderthumb:any;
  myimages:any;
  constructor(private af:AngularFireDatabase,private ng2ImgMaxService: Ng2ImgMaxService) { 
    this.folder = 'productimages';
    this.folderthumb = 'productthumb';
    this.products = this.af.list('/products') as FirebaseListObservable<any>;
    this.images = this.af.list('/images') as FirebaseListObservable<Product[]>;
    this.myproducts = this.af.list('/products');
  }

  getProducts(){
    return this.products;
  }  
  getProductDetails(id){
    this.product = this.af.object('/products/'+id) as FirebaseObjectObservable<Product>;
    console.log('a'); console.log(this.product);
    return this.product;
  }  
  getProductImages(id: any):Observable<Image[]>{
    // I make index of path to check if is thumb or full size. Now we use productimages for full size/
    return this.af.list('images')
    .map(_images => _images.filter(image => image.propid == id && image.path.indexOf('productimages') !== -1));
  }  
  getProductImagesAll():Observable<Product[]>{
    return this.af.list('images')
    .map(_images => _images);
  }
  getProductsImageKey(propid: any){
    var ref = firebase.database().ref("images");
    ref.orderByChild("propid").equalTo(propid).on("child_added", function(snapshot) {

    });
  }
  getProductsByTitle(title: any): Observable<Product[]> {
    return this.af.list('products')
    .map(_products => _products.filter(product => product.title.toLowerCase().indexOf(title) !== -1));

  }
  getProductsByCategory(category: any): Observable<Product[]> {
    console.log('inside list');
    console.log(category);
    return this.af.list('products')
    .map(_products => _products.filter(product => product.category.indexOf(category) !== -1));

  }
  deleteImage(id){
    this.image = this.af.object('/images/'+id) as FirebaseObjectObservable<Image>;
    return this.image.remove();
  }
  deleteProduct(id){
    this.product = this.af.object('/products/'+id) as FirebaseObjectObservable<Product>;
    return this.product.remove();
  }
  addProduct(product){
    //create root ref
    let storageRef = firebase.storage().ref();
    let random = Math.floor(Math.random() * 500) + 1  ;

    let files = [(<HTMLInputElement>document.getElementById('image')).files];
    let firstimagename= files[0][0].name;
    var pathfirst = '';
    var pathsecond ='';
    var uploadTaks;
    var resizeTask;
    var status;
    var imgCrop = [];
    var imgCropThumb = [];
    let propRef = this.products.push(product);
    for(var i=0;i<files[0].length;i++){
      let selectedFile = files[0][i];
      let path = `/${this.folder}/${random}${selectedFile.name}`;
      let paththumb = `/${this.folderthumb}/${random}${selectedFile.name}`;
      let pathfirst = path;
      let pathsecond= paththumb;
      let iRef = storageRef.child(path);
      let iRefThumb = storageRef.child(paththumb);
      //full resize image and upload
      this.ng2ImgMaxService.resize([selectedFile], 10000, 600).subscribe(        
        (result)=>{
          imgCrop.push(result);
          console.log(result);
          //upload to firebase
          uploadTaks = iRef.put(result).then((snapshot)=>{
            let image = {
              name:selectedFile.name,
              path:path,
              propid:propRef.key
            }
           this.images.push(image);
          });
          //then...
          uploadTaks.then((snapshot)=>{
          //get dowload image url and update the product with the full size url and thumb url
          storageRef.child(pathfirst).getDownloadURL().then((url) => {
              // Set image url
              product.url = url;
              this.editProduct(propRef.key,product);
              
            }).catch((error) => {
              console.log(error);
            }); 
          });     


        }
      );//end full resize
      //make thumbnail
      this.ng2ImgMaxService.resize([selectedFile], 1000, 300).subscribe(        
        (result)=>{
          imgCropThumb.push(result);
          //upload to firebase
          uploadTaks = iRefThumb.put(imgCropThumb[0]).then((snapshot)=>{
            let image = {
              name:selectedFile.name,
              path:paththumb,
              propid:propRef.key
            }
            this.images.push(image);
          });
          //then...
          uploadTaks.then((snapshot)=>{
          //get dowload image url and update the product with the full size url and thumb url
          storageRef.child(pathsecond).getDownloadURL().then((thumburl) => {
              // Set image url
              product.thumburl = thumburl;
              this.editProduct(propRef.key,product);
              
            }).catch((error) => {
              console.log(error);
            }); 
          });     


        }
        );
      //end thumbnail


    }
  }

  editProduct(key,product){
    this.products.update(key,product);
    console.log("ERE");
    console.log(key);
    //update images
    let storageRef = firebase.storage().ref();
    let files = [(<HTMLInputElement>document.getElementById('image')).files];

  }
}

interface Product{
  $key?:string;
  $title?:string;
  category?:string;
  image?:string;
  city?:string;
  displayName?:string;
  email?:string;
  photoURL?:string;
}
interface Image{
  $key?:string;
  name?:string;
  path?:string;
  propid?:string;
}

