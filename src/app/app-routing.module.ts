import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  { path: 'task-list', component: TaskListComponent },
  { path: '', redirectTo: 'task-list', pathMatch: 'full' },
  { path: '**', redirectTo: 'task-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
