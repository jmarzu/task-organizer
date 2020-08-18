import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  // @Input() content;
  // @Input() task: Task;

  constructor() { }

  ngOnInit() {
  }

}
