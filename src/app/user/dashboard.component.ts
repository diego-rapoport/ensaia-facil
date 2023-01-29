import { Component, OnInit } from '@angular/core'
import { GoogleAuthService } from '../shared/services/google-auth.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: any
  constructor(private googleService: GoogleAuthService) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.googleService.getUserProfile()
  }

  logout() {
    this.googleService.logout()
  }
}
