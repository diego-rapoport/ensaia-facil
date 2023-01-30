import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class TimeManipulationService {
  private regex = new RegExp('-[0-9][0-9]:.*')
  private replaceToZ = 'Z'

  replaceEndDatetime(datetime: string): string {
    return datetime.replace(this.regex, this.replaceToZ)
  }

  formatToRFC3339(date: Date): string {
    return this.formatToRFC3339(date)
  }

  resetTime(date: Date) {
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    return date
  }
}
