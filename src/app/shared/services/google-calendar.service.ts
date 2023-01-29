import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class GoogleCalendarService {
  private headersAuth: HttpHeaders = new HttpHeaders()
  private _token: string = ''
  private baseURL = 'https://www.googleapis.com/calendar/v3'
  private allCalendarsURL = '/users/me/calendarList'

  constructor(private http: HttpClient) {}

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

  getEventsFromTo(calendar: string, from: string, to: string) {
    const URL = this.baseURL + `/calendars/${calendar}/events`
    const headers = this.getHeaders()
    const params = {
      timeMin: from,
      timeMax: to,
    }
    return this.http.get(URL, { headers: headers, params: params })
  }
}
