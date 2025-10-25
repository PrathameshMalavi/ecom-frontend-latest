import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { UserAuthService } from "../_services/user-auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if (req.headers.get("No-Auth") === "True") {
    //   return next.handle(req.clone());
    // }

    // const token = this.userAuthService.getToken();

    // if (token) {
    //   req = this.addToken(req, token);
    // }

    // Skip OPTIONS requests (preflight)
    // if (req.method === "OPTIONS") {
    //   return next.handle(req);
    // }

    // const token = this.userAuthService.getToken();
    // if (token) {
    //   req = req.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    // }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err.status);
        if (err.status === 401) {
          this.router.navigate(["/login"]);
        } else if (err.status === 403) {
          this.router.navigate(["/forbidden"]);
        }
        return throwError("Some thing is wrong");
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    console.log("********** : " + token);
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
