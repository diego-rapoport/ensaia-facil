import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { GoogleAuthService } from './shared/services/google-auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ensaia-facil'
  validToken: boolean = false

  constructor(
    private googleOauthService: GoogleAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validToken = this.googleOauthService.hasValidToken()
    // if (this.validToken) this.router.navigate(['/user/dashboard'])
  }

  async enterApp() {
    this.googleOauthService.initCodeFlow()
    this.validToken = this.googleOauthService.hasValidToken()
    location.reload()
  }
}
