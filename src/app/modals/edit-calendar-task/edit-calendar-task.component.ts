import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InvokeFunctionExpr } from '@angular/compiler';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-edit-calendar-task',
  templateUrl: './edit-calendar-task.component.html',
  styleUrls: ['./edit-calendar-task.component.css']
})
export class EditCalendarTaskComponent implements OnInit {
  @Input() event: CalendarEvent;

  constructor(private modal: NgbActiveModal) { }

  ngOnInit() {
  }

}
