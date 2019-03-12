import { Component, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
  selector: 'app-contact',
  moduleId: module.id,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  title: string;
  address: string;

  constructor() { }

  ngOnInit() {
      this.title = "Contact Information";
   }

   onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}

}