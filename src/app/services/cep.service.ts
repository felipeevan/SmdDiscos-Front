import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CepApiService {
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) {}

    getCep(cep: String): Observable<any> {
        return this.http
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .pipe(retry(1), catchError(this.handleError));
    }

    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(() => {
          return errorMessage;
        });
    }
}