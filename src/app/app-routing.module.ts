import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TetrisComponent } from './tetris/tetris.component';
import { TaskCalendarComponent } from './task-calendar/task-calendar.component';

const routes: Routes = [
  { path: 'task-list', component: TaskListComponent },
  { path: 'break-time', component: TetrisComponent },
  { path: 'calendar/:id', component: TaskCalendarComponent },
  { path: '', redirectTo: 'task-list', pathMatch: 'full' },
  { path: '**', redirectTo: 'task-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
