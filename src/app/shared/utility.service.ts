import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  todaysDate() {
    let today: any = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    today = new Date(mm + '/' + dd + '/' + yyyy);

    return today;
  }

  _setDateInOneWeek() {
    const today = new Date();
    const dd = String(today.getDate() + 7).padStart(2);
    const mm = String(today.getMonth() + 1).padStart(2);
    const yyyy = today.getFullYear();

    const nextweek = new Date(mm + '/' + dd + '/' + yyyy);

    return nextweek;
  }

  normalizeDate(date) {
    if (date && date.month && date.day && date.year) {
      return `${date.month}/${date.day}/${date.year}`;
    }
  }

  normalizeDateForDatePicker(date) {
    const dpDate = date.split(' ');
    const monthMap = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12
    };

    return {
      month: monthMap[dpDate[0]],
      day: parseInt(dpDate[1]),
      year: parseInt(dpDate[2])
    };
  }

  minDateForDatePicker() {
    const today: any = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return { month: mm, day: dd, year: yyyy };
  }
}
