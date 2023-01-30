import { Injectable } from '@angular/core'
import { CalendarEvent } from 'angular-calendar'
import { ICalendarEvent } from './google-calendar.service'

@Injectable({
  providedIn: 'root',
})
export class GCalendarToACalendarService {
  constructor() { }

  transformToCalendar(item: ICalendarEvent): CalendarEvent {
    const calendarTransformed: CalendarEvent = {
      start: new Date(item.start.dateTime),
      end: new Date(item.end.dateTime),
      title: item.summary,
    }

    return calendarTransformed
  }

  getListTransformed(items: ICalendarEvent[]): CalendarEvent[] {
    return items.filter(item => item.start && item.end).map(this.transformToCalendar)
  }
}
