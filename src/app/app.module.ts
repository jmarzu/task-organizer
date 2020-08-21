import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TetrisComponent } from './tetris/tetris.component';
import { TaskCalendarComponent } from './task-calendar/task-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EditTaskComponent } from './modals/edit-task/edit-task.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditCalendarTaskComponent } from './modals/edit-calendar-task/edit-calendar-task.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TetrisComponent,
    TaskCalendarComponent,
    EditTaskComponent,
    EditCalendarTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  entryComponents: [
    EditTaskComponent,
    EditCalendarTaskComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
