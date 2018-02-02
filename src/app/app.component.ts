import { Component } from '@angular/core';
import {
	animate,
	animateChild,
	query,
	style,
	group,
	transition,
	trigger
} from "@angular/animations";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
//our root app component
import {NgModule, VERSION} from '@angular/core'
import {RouterModule,RouterOutlet, RouteReuseStrategy,Params} from '@angular/router'
import {BrowserModule} from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
