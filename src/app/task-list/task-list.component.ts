import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EditTaskComponent } from '../modals/edit-task/edit-task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  closeResult = '';
  defaultFormData: Task = { name: '', created: null, dueDate: null, bucket: '' };
  protected task: Task = { ...this.defaultFormData };
  protected buckets = [ 'Work', 'Music', 'Grocery Store', 'Misc' ];
  public taskList: any = [];

  constructor(private modalService: NgbModal, editModal: EditTaskComponent) { }

  ngOnInit() {
  }

  addTask(taskForm: NgForm) {
    const addedTask = {
      name: taskForm.value.name,
      bucket: taskForm.value.bucket || 'General',
      created: this._todaysDate(),
      dueDate: this._normalizeDueDate(taskForm.value.dueDate)
    };

    if (taskForm.valid) {
      this.taskList.push(addedTask);
      this.clearTask();
    }
  }

  clearTask() {
    this.task = this.defaultFormData;
  }

  clearList() {
    this.taskList = [];
  }

  removeTask(task) {
    this.taskList = this.taskList.filter(i => i.name !== task.name);
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

  open(content, task) {
    console.log(content, task);
    this.modalService.open(EditTaskComponent).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
