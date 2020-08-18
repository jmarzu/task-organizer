import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditTaskComponent } from '../modals/edit-task/edit-task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  closeResult = '';
  defaultTaskData: Task = { name: '', created: null, dueDate: null, bucket: '' };
  protected task: Task = { ...this.defaultTaskData };
  protected buckets = [ 'Work', 'Music', 'Grocery Store', 'Misc' ];
  public taskList: any = [];

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  clearList() {
    this.taskList = [];
  }

  removeTask(task) {
    this.taskList = this.taskList.filter(i => i.name !== task.name);
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

  openEditTaskModal(task): NgbModalRef {
    let modalInstance: NgbModalRef;
    let componentInstance: EditTaskComponent;

    modalInstance = this.modalService.open(EditTaskComponent);

    modalInstance.componentInstance.task = task;
    componentInstance = modalInstance.componentInstance;

    modalInstance.result.then(result => {
      console.log(result);
      this.taskList.push(result);
    });

    return modalInstance;
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
