import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { EditCalendarTaskComponent } from '../modals/edit-calendar-task/edit-calendar-task.component';
import { UtilityService } from '../shared/utility.service';
import { TaskListService } from '../task-list/task-list.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-task-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-calendar.component.html',
  styleUrls: ['./task-calendar.component.css']
})
export class TaskCalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  refresh: Subject<any> = new Subject();

  eventList = [];

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.openEventModal(event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.eventList = this.eventList.filter((iEvent) => iEvent !== event);
        this.openEventModal(event);
      },
    },
  ];

  activeDayIsOpen = false;

  constructor(
    private modal: NgbModal,
    private utilityService: UtilityService,
    private taskService: TaskListService) {}

  ngOnInit(): void {
    // Adding model props for start/end date
    this.taskService.getTasks().subscribe(
      tasks => {
        tasks.forEach(task => {
          task.actions = this.actions;
          task.start = new Date();
          task.end = new Date(2020, 9, 24, 10, 0, 0, 0);
        });
        this.eventList = this.eventList.concat(tasks);
      }
    );
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.eventList = this.eventList.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.openEventModal(event);
  }

  openEventModal(event: CalendarEvent): NgbModalRef {
    let modalInstance: NgbModalRef;
    let componentInstance: EditCalendarTaskComponent;

    modalInstance = this.modal.open(EditCalendarTaskComponent);

    componentInstance = modalInstance.componentInstance;
    componentInstance.event = event;

    modalInstance.result.then(data => {
      console.log(data);
    });

    return modalInstance;
  }

  addEvent(): void {
    // add event
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.eventList = this.eventList.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
