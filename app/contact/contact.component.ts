import { Component, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

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

}