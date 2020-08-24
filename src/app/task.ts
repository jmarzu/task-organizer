import { AnimationQueryMetadata } from '@angular/animations';
import { CalendarEvent } from 'angular-calendar';

export interface Task extends CalendarEvent {
  id?: number;
  bucket?: string;
  datePickerDate?: { month: number, day: number, year: number };
}
