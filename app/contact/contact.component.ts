import { Component, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import * as Email from 'nativescript-email';
import * as TNSPhone from 'nativescript-phone';

@Component({
  selector: 'app-contact',
  moduleId: module.id,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  title: string;
  address: string;

  constructor(private fonticon: TNSFontIconService) { }

  ngOnInit() {
      this.title = "Contact Information";
   }

   onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
    }

    sendEmail() {

      Email.available()
        .then((avail: boolean) => {
          if (avail) {
            Email.compose({
              to: ['confusion@food.net'],
              subject: '[ConFusion]: Query',
              body: 'Dear Sir/Madam:'
            });
          }
          else
            console.log('No Email Configured');
        })
  
    }

    callRestaurant(){
      
      const phoneNumber = '+852 1234 5678';
      TNSPhone.requestCallPermission('You should accept the permission to be able to make a direct phone call.')
          .then(() => TNSPhone.dial(phoneNumber, false))
          .catch(() => TNSPhone.dial(phoneNumber, true));
    }
      

        

}