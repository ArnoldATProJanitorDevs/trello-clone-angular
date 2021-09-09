import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() {
  }


  getDaysOfWeek(current) {
    const week = [];
    const options = {weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric'};
    // Starting Monday not Sunday
    current.setDate((current.getDate() - current.getDay() + 1));
    for (let i = 0; i < 7; i++) {
      week.push(current.toLocaleDateString('en-GB', options));
      current.setDate(current.getDate() + 1);

    }
    return week;
  }
}
