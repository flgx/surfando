import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes,RouteReuseStrategy} from '@angular/router';
import { FirebaseService } from './services/firebase.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductComponent } from './components/product/product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AngularFireModule } from 'angularfire2';
// for AngularFireDatabase
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
// for AngularFireAuth
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute,ActivatedRouteSnapshot,DetachedRouteHandle,RouterOutlet } from '@angular/router';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { CarouselModule } from 'ng2-bootstrap/carousel';
import { SearchComponent } from './components/search/search.component';
import { CategoryComponent } from './components/category/category.component';

import { Ng2OrderModule } from 'ng2-order-pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { OrderbyPipe } from './pipes/orderby.pipe';
import { GivemeimagePipe } from './pipes/givemeimage.pipe';
import { Ng2ImgMaxModule } from 'ng2-img-max'; // <-- import the module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './shared/auth.service';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { environment } from '../environments/environment';
import { Ng2FileRequiredModule } from 'ng2-file-required';
import {ImageZoomModule} from 'angular2-image-zoom';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import { Observable } from 'rxjs/Observable';

const appRoutes: Routes = [
  {path: '', component: SearchComponent, data:{animation:Math.random()}},
  {path: 'product/:id', component: ProductComponent, data:{animation:Math.random()}},
  {path: 'product/edit/:id', component: EditProductComponent, data:{animation:Math.random()}},
  {path: 'product/category/:category', component: CategoryComponent, data:{animation:Math.random()}},
  {path: 'agregar-producto', component: AddProductComponent, data:{animation:Math.random()}},
]
const environment1 = {
  production: false,
  firebase:{
      apiKey: "AIzaSyAcb5LywJBLAod1bYqg17ggZ2ix1HcxfDI",
      authDomain: "learningvue-9483c.firebaseapp.com",
      databaseURL: "https://learningvue-9483c.firebaseio.com",
      projectId: "learningvue-9483c",
      storageBucket: "learningvue-9483c.appspot.com",
      messagingSenderId: "52919849178"    
  }
};
export class CustomStrategy extends RouteReuseStrategy {
  shouldDetach(route: ActivatedRouteSnapshot): boolean { return false; }
  store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {}
  shouldAttach(route: ActivatedRouteSnapshot): boolean { return false; }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null { return null; }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return false;
  }
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    CategoryComponent,
    SearchComponent,
    ReversePipe,
    OrderbyPipe,
    GivemeimagePipe,
  ],
  imports: [
    BrowserModule,
    LazyLoadImagesModule,
    Ng2ImgMaxModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Ng2FileRequiredModule,
    Ng2OrderModule,
    FlashMessagesModule,
    ImageZoomModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    AngularFireModule.initializeApp(environment1.firebase),    
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    RouterModule.forRoot(appRoutes),    
    CarouselModule.forRoot()
  ],
  schemas: [
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA

  ],
  providers: [
  {provide: RouteReuseStrategy, useClass: CustomStrategy},

  FirebaseService,AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
