import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/task';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  @Input() task: Task;

  editMode: boolean;
  taskList: any = [];

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
    this.editMode = !!this.task.name;
  }

  addTask(taskModalForm: NgForm) {
    console.log('fired in modal', taskModalForm.value);
    const addedTask = {
      name: taskModalForm.value.name,
      bucket: taskModalForm.value.bucket || 'General',
      created: this._todaysDate(),
      dueDate: taskModalForm.value.dueDate || this._normalizeDueDate(taskModalForm.value.dueDate)
    };

    this.modal.close(addedTask);
  }

  _todaysDate() {
    let today: any = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return today = mm + '/' + dd + '/' + yyyy;
  }

  _setDateInOneWeek() {
    const today = new Date();
    const dd = String(today.getDate() + 7).padStart(2);
    const mm = String(today.getMonth() + 1).padStart(2);
    const yyyy = today.getFullYear();
    const nextweek = { month: parseInt(mm), day: parseInt(dd), year: yyyy };

    return nextweek;
  }

  _normalizeDueDate(date) {
    // if not action taken for a due date, set date for 1 week out
    if (date && date.month && date.day && date.year) {
      return `${date.month}/${date.day}/${date.year}`;
    } else {
      return this._setDateInOneWeek();
    }
  }

  passBack() {
    this.modal.close(this.task);
  }

}
