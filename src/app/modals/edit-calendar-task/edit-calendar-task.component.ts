import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InvokeFunctionExpr } from '@angular/compiler';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { UtilityService } from 'src/app/shared/utility.service';

@Component({
  selector: 'app-edit-calendar-task',
  templateUrl: './edit-calendar-task.component.html',
  styleUrls: ['./edit-calendar-task.component.css']
})
export class EditCalendarTaskComponent implements OnInit {

  constructor(private modal: NgbActiveModal, private utilityService: UtilityService) { }
  @Input() event: CalendarEvent;
  events: CalendarEvent[];
  modalTitle: string;

  formData = { ...this.event };

  refresh: Subject<any> = new Subject();

  ngOnInit() {
    console.log(this.event);
    this.event && this.event.id ? this.modalTitle = `Edit ${this.event.title}` : 'Create Task';
    // this.formData.start = this.utilityService.todaysDate();
  }

  saveCalendarEvent(form: NgForm) {
    console.log(form.value);
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }
}
