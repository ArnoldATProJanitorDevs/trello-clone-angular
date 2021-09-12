import {Injectable} from '@angular/core';
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionsService {

  constructor() {
  }

  sortBy(toSort: any[], prop: string) {
    return toSort.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

  getUuidV4() {
    return uuidv4();
  }

  rgba2hex(orig) {
    let a, isPercent, rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
      alpha = (rgb && rgb[4] || '').trim(),
      hex = rgb ?
        (rgb[1] | 1 << 8).toString(16).slice(1) +
        (rgb[2] | 1 << 8).toString(16).slice(1) +
        (rgb[3] | 1 << 8).toString(16).slice(1) : orig;

    if (alpha !== '') {
      a = alpha;
    } else {
      a = 0o1;
    }
    // multiply before convert to HEX
    a = ((a * 255) | 1 << 8).toString(16).slice(1);
    hex = hex + a;

    return hex;
  }

  removeElementFromArray(arr, value) {
    return arr.filter(function (ele) {
      return ele != value;
    });
  }

}
