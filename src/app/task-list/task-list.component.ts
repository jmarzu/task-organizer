import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditTaskComponent } from '../modals/edit-task/edit-task.component';
import * as _ from 'lodash';
import { TaskListService } from './task-list.service';
import { UtilityService } from '../shared/utility.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  defaultTaskData: Task = { title: '', start: null, end: null, bucket: '' };
  protected task: Task = { ...this.defaultTaskData };
  public taskList: Task[] = [];
  errorMessage: any;

  constructor(private modalService: NgbModal, private taskService: TaskListService, private utilityService: UtilityService) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe(
      tasks => {
        this.taskList = tasks;
      },
      error => this.errorMessage = error
    );

    // this.taskList.forEach(task => task.start = this.utilityService.todaysDate());
  }

  clearList() {
    this.taskList = [];
  }

  removeTask(task) {
    this.taskList = this.taskList.filter(i => i.id !== task.id);
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
