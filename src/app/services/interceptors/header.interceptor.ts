import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { UserService } from '../user.service';
import { environment, vendor } from 'src/environments/environment';
import { take, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // do not intercept request whose urls are filtered by the injected filter
    return this.userService.token$.pipe(
      take(1),
      mergeMap(token => {
        const urlIsForAPI = req.url.startsWith(environment.apiUrl);
        if (urlIsForAPI) {
          let newHeaders: HttpHeaders = req.headers;
          if (token != null) {
            newHeaders = newHeaders.set(
              'X-CaCharge-Token', token,
            );
          }

          if (vendor?.vendorAppId) {
            newHeaders = newHeaders.set(
              'X-App-Uuid', vendor.vendorAppId,
            );
          } else {
            const errorText = 'Lacking vendorAppId. This value is set in environments.ts';
            console.error(errorText);
            throw(errorText);
          }

          const clonereq = req.clone({ headers: newHeaders });
          return next.handle(clonereq);
        } else {
          return next.handle(req);
        }
      }),
    );
  }

  protected get userService(): UserService {
    return this.injector.get(UserService);
  }
}
