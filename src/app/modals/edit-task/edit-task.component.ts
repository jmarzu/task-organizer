import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/task';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { UtilityService } from 'src/app/shared/utility.service';

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

  taskModalForm: FormGroup;

  constructor(public modal: NgbActiveModal, private utilityService: UtilityService, private fb: FormBuilder) { }

  ngOnInit() {
    this.formData = { ...this.task };
    this.editMode = !!this.formData.id;

    if (!this.formData.id) {
      this.formData.id = Math.floor(Math.random() * 1000000);
    }

    this.taskModalForm = this.fb.group({
      title: [this.task.title || '', Validators.required],
      end: [this.task.end || ''],
      bucket: [this.task.bucket || ''],
    });
  }

  saveTask(taskModalForm: FormGroup) {
    const addedTask = {
      ...this.formData,
      title: taskModalForm.value.title,
      bucket: taskModalForm.value.bucket || 'General',
      start: this.utilityService.todaysDate(),
      end: taskModalForm.value.end || this.utilityService.normalizeDate(taskModalForm.value.end)
    };

    this.modal.close(addedTask);
  }
}
