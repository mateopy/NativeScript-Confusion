import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { DatePicker } from 'ui/date-picker';
import { TimePicker } from 'ui/time-picker';
import { ListPicker } from 'ui/list-picker';
import { Page } from 'ui/page';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
    moduleId: module.id,
    templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {

    commentForm: FormGroup;
    comment: Comment;

    constructor(private params: ModalDialogParams,
        private page: Page,
        private formBuilder: FormBuilder,
        private modalService: ModalDialogService, 
        ) {

            this.commentForm = this.formBuilder.group({
                rating: 5,
                author: ['', Validators.required],
                comment: ['', Validators.required]
            });

           
    }

    ngOnInit() {

       
    }

    onSubmit() {
        //console.log(JSON.stringify(this.commentForm.value));
        this.comment = this.commentForm.value;
        var d = new Date();
        this.comment.date = d.toISOString();
        this.params.closeCallback(this.comment);
    }

    
}