import { Component, OnInit } from '@angular/core'
import { GoogleAuthService } from './shared/services/google-auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ensaia-facil'
  validToken: boolean = false

  constructor(private googleOauthService: GoogleAuthService) {}

  ngOnInit(): void {
    this.validToken = this.googleOauthService.hasValidToken()
  }

  async enterApp() {
    this.googleOauthService.initCodeFlow()
    this.validToken = this.googleOauthService.hasValidToken()
    location.reload()
  }
}
