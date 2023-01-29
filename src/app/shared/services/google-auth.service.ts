import { Injectable, OnInit } from '@angular/core'
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService implements OnInit {
  private readonly oAuthConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    redirectUri: `${window.location.origin}/user/dashboard`,
    useSilentRefresh: true,
    clientId: environment['CLIENT_ID'],
    scope: environment['SCOPES'],
    showDebugInformation: true,
    logoutUrl: environment.LOGOUT,
    sessionChecksEnabled: true,
  }
  token: string = ''

  constructor(private readonly oAuthService: OAuthService) {
    this.oAuthService.configure(this.oAuthConfig)
    this.oAuthService.loadDiscoveryDocumentAndTryLogin()
  }

  ngOnInit(): void {
    if (this.hasValidToken()) this.token = this.getToken()
  }

  async initCodeFlow() {
    return await this.oAuthService.tryLoginCodeFlow().then(async () => {
      if (!(await this.getUserProfile())) {
        this.oAuthService.initImplicitFlow()
      } else {
        await this.oAuthService.loadUserProfile()
        this.token = this.getToken()
      }
    })
  }

  async getUserProfile() {
    if (this.oAuthService.hasValidAccessToken()) {
      return await this.oAuthService.loadUserProfile()
    }
    return ''
  }

  logout() {
    this.oAuthService.logOut()
  }

  hasValidToken() {
    return (
      this.oAuthService.hasValidAccessToken() ||
      this.oAuthService.hasValidIdToken()
    )
  }

  getToken() {
    return this.oAuthService.getAccessToken()
  }
}
