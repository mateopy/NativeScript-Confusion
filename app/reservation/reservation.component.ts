import { Component, OnInit, Inject, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { TextField } from 'ui/text-field';
import { Switch } from 'ui/switch';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ReservationModalComponent } from "../reservationmodal/reservationmodal.component";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Page } from "ui/page";
import { View } from "ui/core/view";
import { CouchbaseService } from '../services/couchbase.service';


@Component({
    selector: 'app-reservation',
    moduleId: module.id,
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

    reservation: FormGroup;
    showReservationForm: boolean = true;
    showReservationData: boolean = false;
    reservationForm: View;
    reservationData: View;
    docId: string = "reservations";
    reservations: Array<any>;

    constructor(private formBuilder: FormBuilder,
        private modalService: ModalDialogService, 
        private vcRef: ViewContainerRef,
        private page: Page,
        private couchbaseService: CouchbaseService
        ) {

            this.reservation = this.formBuilder.group({
                guests: 3,
                smoking: false,
                dateTime: ['', Validators.required]
            });

            this.reservations = [];

            
    }

    ngOnInit() {

    }

    addReservation(reservation: any) {

        let doc = this.couchbaseService.getDocument(this.docId);
        if( doc == null) {
            console.log("This is the first reservation");
            console.log(reservation);
            this.couchbaseService.createDocument({"reservations": []}, this.docId);
            
        }
        else {
            this.reservations = doc.reservations;

        }
        this.reservations.push(reservation);
        this.couchbaseService.updateDocument(this.docId, {"reservations": this.reservations});
        doc = this.couchbaseService.getDocument(this.docId);
        console.log(doc);
    
      }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onSmokingChecked(args) {
        let smokingSwitch = <Switch>args.object;
        if (smokingSwitch.checked) {
            this.reservation.patchValue({ smoking: true });
        }
        else {
            this.reservation.patchValue({ smoking: false });
        }
    }

    onGuestChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ guests: textField.text});
    }

    onDateTimeChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ dateTime: textField.text});
    }

    onSubmit() {
        this.reservationForm = this.page.getViewById<View>('reservationForm');
        this.reservationData  = this.page.getViewById<View>('reservationData');

        this.reservationForm.animate({
            opacity: 0,
            scale: { x: 0, y: 0},
            duration: 500,
            
          }).then(() => {
            this.showReservationForm = false;
            this.showReservationData = true;
            this.reservationData.animate({
                opacity: 1,
                scale: { x: 1, y: 1},
                duration: 500,
              })
            
        });

        this.addReservation(this.reservation.value);
        
    }

    createModalView(args) {

        let options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: args,
            fullscreen: false
        };

        this.modalService.showModal(ReservationModalComponent, options)
            .then((result: any) => {
                if (args === "guest") {
                    this.reservation.patchValue({guests: result});
                }
                else if (args === "date-time") {
                    this.reservation.patchValue({ dateTime: result});
                }
            });

    }
}