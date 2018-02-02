import { Component, OnInit,HostBinding} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';
import { Ng2ImgMaxService } from 'ng2-img-max';
import * as firebase from 'firebase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { slideInDownAnimation } from '../../animations';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable,Inject } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  animations: [ slideInDownAnimation ]
})
export class AddProductComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';
  title:any;
  owner:any;
  bedrooms:any;
  price:any;
  category:any;
  url:any;
  description:any;
  city:any;
  photoURL:any;
  email:any;
  displayName:any;
  image:any;
  isvalid:any;
  form;

  constructor(
    @Inject(AngularFireAuth) public  afAuth: AngularFireAuth,
    private firebaseService:FirebaseService,
    private router:Router,
    ) {

    this.title = '';
    this.image = '';
    this.isvalid=false;
    this.category = '';
    this.city = '';
    this.bedrooms = '';
    this.price = '';
    this.description = '';
    this.category = '';
    this.displayName = '';
    this.email = '';
    this.photoURL = '';
    afAuth.authState.subscribe((user: firebase.User) => {
      if(user != null){

        this.displayName = user.displayName;
        this.email = user.email;
        this.photoURL = user.photoURL;      
      }   
    })
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.title,Validators.compose([
        Validators.required,
        Validators.minLength(3)
        ])),
      image: new FormControl(this.image,Validators.compose([
        ])),
      price: new FormControl(this.price,Validators.compose([
        ])),
      category: new FormControl(this.category,Validators.compose([
        ])),
      bedrooms: new FormControl(this.bedrooms,Validators.compose([
        ])),
      city: new FormControl(this.city,Validators.compose([
        ])),
      description: new FormControl(this.description,Validators.compose([
        Validators.required,
        Validators.minLength(50)
        ])),
    });

  }
  validateImage(){
    this.isvalid = true;
  }
  onAddSubmit(event){
    //event.preventDefault();
    let product = {
      title:this.title,
      city:this.city,
      price:this.price,
      description:this.description,
      category:this.category,
      displayName:this.displayName,
      photoURL:this.photoURL,
      email:this.email,
      created_at: new Date('D M Y'),
      updated_at: new Date('D M Y')
    }

    
    
    this.firebaseService.addProduct(product);
  }



}
