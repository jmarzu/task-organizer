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

    return today = { month: parseInt(mm), day: parseInt(dd), year: yyyy };
  }

  _setDateInOneWeek() {
    const today = new Date();
    const dd = String(today.getDate() + 7).padStart(2);
    const mm = String(today.getMonth() + 1).padStart(2);
    const yyyy = today.getFullYear();
    const nextweek = { month: parseInt(mm), day: parseInt(dd), year: yyyy };

    return this.normalizeDate(nextweek);
  }

  normalizeDate(date) {
    // if not action taken for a due date, set date for 1 week out
    if (date && date.month && date.day && date.year) {
      return `${date.month}/${date.day}/${date.year}`;
    } else {
      return this._setDateInOneWeek();
    }
  }
}
