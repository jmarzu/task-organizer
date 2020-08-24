import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InvokeFunctionExpr } from '@angular/compiler';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/shared/utility.service';

@Component({
  selector: 'app-edit-calendar-task',
  templateUrl: './edit-calendar-task.component.html',
  styleUrls: ['./edit-calendar-task.component.css']
})
export class EditCalendarTaskComponent implements OnInit {

  constructor(private modal: NgbActiveModal, private utilityService: UtilityService, private fb: FormBuilder) { }
  @Input() event: CalendarEvent;
  events: CalendarEvent[];
  modalTitle: string;

  formData = { ...this.event };
  editCalendarEventForm: FormGroup;

  refresh: Subject<any> = new Subject();

  ngOnInit() {
    this.event && this.event.id ? this.modalTitle = `Edit ${this.event.title}` : this.modalTitle = 'Create Task';

    this.initForm();
  }

  initForm(title = '', start = new Date(), end = new Date()) {
    if (this.event.title) {
      title = this.event.title;
      start = this.event.start;
      end = this.event.end;
    }

    this.editCalendarEventForm = this.fb.group({
      title: [ title, Validators.required ],
      start: [ start ],
      end: [ end ]
    });
  }

  saveCalendarEvent(form: FormGroup) {
    console.log(form.value);
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }
}
