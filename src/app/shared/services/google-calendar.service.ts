import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

type CreatorOrganizer = {
  email: string
  self: boolean
}

type DateTimezone = {
  dateTime: string
  timeZone: string
}

export interface ICalendarEvent {
  kind: string
  etag: string
  id: string
  status: string
  htmlLink?: string
  created: string
  updated?: string
  timeZone?: string
  accessRole?: string
  summary: string
  creator: CreatorOrganizer
  organizer: CreatorOrganizer
  start: DateTimezone
  end: DateTimezone
  recurringEventId?: string
  originalStartTime?: DateTimezone
  iCalUID?: string
  sequence: number
  reminders?: { useDefault: boolean }
  eventType: string
}

export interface ICalendarResponse {
  kind: string
  etag: string
  summary: string
  updated: string
  timeZone: string
  accessRole: string
  defaultReminders: { method?: string; minutes?: number }[]
  nextPageToken?: string
  nextSyncToken?: string
  items: ICalendarEvent[]
}

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarService {
  private headersAuth: HttpHeaders = new HttpHeaders()
  private _token: string = ''
  private baseURL = 'https://www.googleapis.com/calendar/v3'
  private allCalendarsURL = '/users/me/calendarList'

  constructor(private http: HttpClient) { }

  get token() {
    return this._token
  }

  set token(newToken: string) {
    this._token = newToken
  }

  getHeaders() {
    return this.headersAuth.set('Authorization', `Bearer ${this.token}`)
  }

  getAllCalendars() {
    const URL = this.baseURL + this.allCalendarsURL
    const headers = this.getHeaders()
    return this.http.get(URL, { headers: headers })
  }

  getEventsFromTo(
    calendar: string,
    from: string,
    to: string,
    singleEvents: boolean = true
  ): Observable<ICalendarResponse> {
    const URL = this.baseURL + `/calendars/${calendar}/events`
    let thisParams = new HttpParams()
    const extraParams = singleEvents
      ? {
        orderBy: 'startTime',
      }
      : { orderBy: 'updated' }
    const params = {
      timeMin: from,
      timeMax: to,
      singleEvents: singleEvents ? 'true' : 'false',
      ...extraParams,
    }
    Object.entries(params).map(([k, v]) => {
      thisParams = thisParams.append(k, v)
    })
    const headers = this.getHeaders()

    return this.http.get<ICalendarResponse>(URL, {
      headers: headers,
      params: thisParams,
    })
  }
}
