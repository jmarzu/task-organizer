import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  defaultFormData = { name: '', created: this._todaysDate(), dueDate: null, bucket: '' };
  protected task: Task = { ...this.defaultFormData };
  protected buckets = [ 'Work', 'Music', 'Grocery Store', 'Misc' ];
  public taskList: any = [];

  constructor() { }

  ngOnInit() {
  }

  addTask(taskForm: NgForm) {
    const addedTask = {
      name: taskForm.value.name,
      bucket: taskForm.value.bucket,
      created: this._todaysDate(),
      dueDate: this._normalizeDueDate(taskForm.value.dueDate)
    };

    this.taskList.push(addedTask);
    this.clearTask();
  }

  clearTask() {
    this.task = this.defaultFormData;
  }

  clearList() {
    this.taskList = [];
  }

  removeTask(task) {
    this.taskList = this.taskList.filter(i => i !== task);
  }

  viewOnCalendar() {
    console.log('going to the calendar with the to-do-list tasks');
  }

  takeABreak() {
    console.log('I took a break');
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
    const dd = String(today.getDate() + 7).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const nextweek = mm + '/' + dd + '/' + yyyy;

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
}
