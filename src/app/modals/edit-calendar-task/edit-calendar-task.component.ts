import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-calendar-task',
  templateUrl: './edit-calendar-task.component.html',
  styleUrls: ['./edit-calendar-task.component.css']
})
export class EditCalendarTaskComponent implements OnInit {

  constructor(private modal: NgbActiveModal) { }

  ngOnInit() {
  }

}
