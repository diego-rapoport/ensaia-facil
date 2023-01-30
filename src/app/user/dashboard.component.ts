import { Component, OnInit } from '@angular/core'
import { CalendarEvent } from 'angular-calendar'
import { formatRFC3339 } from 'date-fns'
import { GCalendarToACalendarService } from '../shared/services/gcalendar-to-acalendar.service'
import { GoogleAuthService } from '../shared/services/google-auth.service'
import {
  GoogleCalendarService,
  ICalendarResponse,
} from '../shared/services/google-calendar.service'

type UserInfo = { info: { email: string } }

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: '' | Record<string, any> | UserInfo = ''
  token: string = ''
  events: CalendarEvent[] = []
  today: Date = new Date()
  eventsFrom: string = formatRFC3339(this.today)
  eventsTo: string = ''
  viewDate: Date = new Date()

  constructor(
    private googleService: GoogleAuthService,
    private gCalendarService: GoogleCalendarService,
    private transformService: GCalendarToACalendarService
  ) {}

  async ngOnInit(): Promise<void> {
    const tempDate = new Date()
    const regexTimeFormat = new RegExp('-[0-9][0-9]:.*')
    tempDate.setDate(this.today.getDate() + 7)
    this.eventsTo = formatRFC3339(tempDate).replace(regexTimeFormat, 'Z')
    this.eventsFrom = this.eventsFrom.replace(regexTimeFormat, 'Z')
    console.log('DE: ', this.eventsFrom, ' Até: ', this.eventsTo)
    this.user = await this.googleService.getUserProfile()
    this.gCalendarService.token = this.googleService.getToken()
  }

  async getMyEvents() {
    const email: string = this.user ? this.user.info.email : 'primary'
    this.gCalendarService
      .getEventsFromTo(email, this.eventsFrom, this.eventsTo)
      .subscribe((myEvents: ICalendarResponse) => {
        this.events = this.transformService.getListTransformed(myEvents.items)
        console.log('THISEVS = ', this.events)
      })
  }

  logout() {
    this.googleService.logout()
  }
}
