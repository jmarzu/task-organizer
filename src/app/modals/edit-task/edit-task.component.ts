import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/task';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { UtilityService } from 'src/app/shared/utility.service';
import { TaskListService } from 'src/app/task-list/task-list.service';

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
  minDate = this.utilityService.minDateForDatePicker();

  taskModalForm: FormGroup;

  constructor(
    public modal: NgbActiveModal,
    private utilityService: UtilityService,
    private fb: FormBuilder,
    private taskService: TaskListService) { }

  ngOnInit() {
    this.formData = { ...this.task };
    this.editMode = !!this.formData.id;

    if (!this.formData.id) {
      this.formData.id = Math.floor(Math.random() * 1000000);
    }

    if (this.formData.end && !this.formData.datePickerDate) {
      this.formData.datePickerDate = this.utilityService.normalizeDateForDatePicker(this.formData.end);
    }

    this.initForm();
  }

  private initForm(title = '', datePickerDate = null, bucket = ''): void {
    if (this.editMode) {
      title = this.formData.title;
      datePickerDate = this.formData.datePickerDate;
      bucket = this.formData.bucket;
    }

    this.taskModalForm = this.fb.group({
      title: [ title, Validators.required ],
      datePickerDate: [ datePickerDate ],
      bucket: [ bucket ],
    });
  }

  saveTask(taskModalForm: FormGroup) {
    const addedTask = {
      ...this.formData,
      title: taskModalForm.value.title,
      bucket: taskModalForm.value.bucket || 'General',
      start: this.utilityService.todaysDate(),
      datePickerDate: taskModalForm.value.datePickerDate,
      end: new Date(this.utilityService.normalizeDate(taskModalForm.value.datePickerDate))
    };

    this.modal.close(addedTask);
  }
}
