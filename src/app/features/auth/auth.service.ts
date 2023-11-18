import { Injectable, effect, signal } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authTokenKey = '_token';
  private readonly refreshTokenKey = '_refreshToken';

  private readonly _token = signal<string | null>(null);
  private readonly _refreshToken = signal<string | null>(null);

  token = this._token.asReadonly();
  refreshToken = this._refreshToken.asReadonly();

  constructor(private cookieService: SsrCookieService) {
    effect(() => {
      const token = this._token();
      token
        ? this.cookieService.set(this.authTokenKey, token)
        : this.cookieService.delete(this.authTokenKey);
    });

    effect(() => {
      const refreshToken = this._refreshToken();
      refreshToken
        ? this.cookieService.set(this.refreshTokenKey, refreshToken)
        : this.cookieService.delete(this.refreshTokenKey);
    });
  }

  authenticated(): boolean {
    return this.cookieService.check(this.authTokenKey);
  }

  login(token: string, refreshToken: string): void {
    this._token.set(token);
    this._refreshToken.set(refreshToken);
  }

  logout(): void {
    this._token.set(null);
    this._refreshToken.set(null);
  }
}
