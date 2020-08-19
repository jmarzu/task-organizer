import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditTaskComponent } from '../modals/edit-task/edit-task.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  defaultTaskData: Task = { name: '', created: null, dueDate: null, bucket: '' };
  protected task: Task = { ...this.defaultTaskData };
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

  openEditTaskModal(task): NgbModalRef {
    let modalInstance: NgbModalRef;
    let componentInstance: EditTaskComponent;

    modalInstance = this.modalService.open(EditTaskComponent);

    modalInstance.componentInstance.task = task;
    componentInstance = modalInstance.componentInstance;

    modalInstance.result.then(data => {
      if (data && data.id) {
        this._createOrEditTask(data);
      }
    });

    return modalInstance;
  }

  _createOrEditTask(data) {
    const index = _.findIndex(this.taskList, {id: data.id});

    if (index === -1) {
      this.taskList.push(data);
    } else {
      this.taskList.splice(index, 1, data);
    }
  }
}
