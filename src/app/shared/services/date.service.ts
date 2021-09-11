import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() {
  }

  getLocaleDateFormat(current,
                      locale = 'en-GB',
                      options = {weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric'}) {
    const week = [];
    // Starting Monday not Sunday
    current.setDate((current.getDate() - current.getDay() + 1));
    for (let i = 0; i < 7; i++) {
      week.push(current.toLocaleDateString(locale, options));
      current.setDate(current.getDate() + 1);
    }
    return week;
  }
}
