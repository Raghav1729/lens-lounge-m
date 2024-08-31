import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class FrontendProxy {
  constructor(private readonly httpService: HttpService) {}

  getFrontendContent(url: string): Observable<any> {
    return this.httpService
      .get(`http://frontend:3003${url}`)
      .pipe(catchError((error) => throwError(error)));
  }
}
