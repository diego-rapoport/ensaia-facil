import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DashboardRoutingModule } from './dashboard-routing.module'
import { DashboardComponent } from './dashboard.component'
import { GoogleCalendarService } from '../shared/services/google-calendar.service'
import { CalendarModule, DateAdapter } from 'angular-calendar'
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'
import { GCalendarToACalendarService } from '../shared/services/gcalendar-to-acalendar.service'
import { SidebarComponent } from '../shared/layout/sidebar/sidebar.component'

@NgModule({
  declarations: [DashboardComponent, SidebarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [GoogleCalendarService, GCalendarToACalendarService],
})
export class DashboardModule { }
