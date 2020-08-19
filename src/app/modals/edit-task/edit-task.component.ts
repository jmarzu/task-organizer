import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/task';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  @Input() task: Task;

  formData: Task;
  editMode: boolean;
  buckets = [ 'Work', 'Music', 'Grocery Store', 'General' ];

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
    this.formData = { ...this.task };
    this.editMode = !!this.formData.id;

    if (!this.formData.id) {
      this.formData.id = Math.floor(Math.random() * 1000000);
    }
  }

  saveTask(taskModalForm: NgForm) {
    const addedTask = {
      ...this.formData,
      name: taskModalForm.value.name,
      bucket: taskModalForm.value.bucket || 'General',
      created: this._normalizeDate(this.todaysDate()),
      dueDate: taskModalForm.value.dueDate || this._normalizeDate(taskModalForm.value.dueDate)
    };

    this.modal.close(addedTask);
  }

  todaysDate() {
    let today: any = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return today = { month: parseInt(mm), day: parseInt(dd), year: yyyy };
  }

  _setDateInOneWeek() {
    const today = new Date();
    const dd = String(today.getDate() + 7).padStart(2);
    const mm = String(today.getMonth() + 1).padStart(2);
    const yyyy = today.getFullYear();
    const nextweek = { month: parseInt(mm), day: parseInt(dd), year: yyyy };

    return nextweek;
  }

  _normalizeDate(date) {
    // if not action taken for a due date, set date for 1 week out
    if (date && date.month && date.day && date.year) {
      return `${date.month}/${date.day}/${date.year}`;
    } else {
      return this._setDateInOneWeek();
    }
  }
}
