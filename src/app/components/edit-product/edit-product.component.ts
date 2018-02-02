import { Component, OnInit,HostBinding } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';
import { FlashMessagesService } from 'angular2-flash-messages';
import { slideInDownAnimation } from '../../animations';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  animations: [ slideInDownAnimation ]
})
export class EditProductComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';
  id:any;
  product:any;  
  title:any;
  owner:any;
  bedrooms:any;
  price:any;
  category:any;
  city:any;
  image:any;
  constructor(
  	private firebaseService:FirebaseService,
  	private router:Router,
  	private route:ActivatedRoute,
  	private flashMessage:FlashMessagesService
  	) { }

  ngOnInit() {
  	this.id = this.route.snapshot.params['id'];
  	this.firebaseService.getProductDetails(this.id).subscribe(product =>{
      this.product = product;
      this.id = this.product.$key;
  		this.title = this.product.title;
  		this.price = this.product.price;
  		this.category = this.product.category;
  		this.city = this.product.city;
  	});

  }

  onEditSubmit(){
  	let product = {
      id:this.id,
  		title:this.title,
  		city:this.city,
  		owner:this.owner,
  		bedrooms:this.bedrooms,
  		price:this.price,
  		category:this.category
  	}
  	this.firebaseService.editProduct(this.id,product);
    this.flashMessage.show('Product '+this.title+' was edited.' , {cssClass:'alert-success',timeout: 6000});
  	this.router.navigate(['products']);
  }

}
