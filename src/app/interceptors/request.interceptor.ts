import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../features/auth/auth.service";
import { environment } from "../../environments/environment";

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  let headers = req.headers;
  const token = inject(AuthService).token();

  if (token) {
    headers = headers.set("Authorization", `Bearer ${token}`);
  }

  const cloned = req.clone({ url: `${environment.apiUrl}${req.url}`, headers });
  return next(cloned);
};
