import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class AdminService {
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) { }

    loginAdmin(body: any): Observable<any>{
      return this.http.post(`/smdecommerce/LoginCliente`, body)
        .pipe(retry(1), catchError(this.handleError));
    }

    novaCategoria(body: any): Observable<any>{
      return this.http.post(`/smdecommerce/NovaCategoria`, body)
        .pipe(retry(1), catchError(this.handleError));
    }

    listarCategoria(): Observable<any>{
      return this.http.get(`/smdecommerce/ListarCategoria`)
        .pipe(retry(1), catchError(this.handleError));
    }

    editCategoria(body: any): Observable<any>{
      return this.http.post(`/smdecommerce/AtualizarCategoria`, body)
        .pipe(retry(1), catchError(this.handleError));
    }

    excluirCategoria(id: any): Observable<any>{
      let body = {
        'id': id
      }
      return this.http.post(`/smdecommerce/ExcluirCategoria`, body)
        .pipe(retry(1), catchError(this.handleError));
    }

    novoProduto(body: any): Observable<any>{
      return this.http.post(`/smdecommerce/NovoProduto`, body)
        .pipe(retry(1), catchError(this.handleError));
    }

    listarProduto(): Observable<any>{
      return this.http.get(`/smdecommerce/ListarProdutos`)
        .pipe(retry(1), catchError(this.handleError));
    }

    editProduto(body: any): Observable<any>{
      return this.http.post(`/smdecommerce/AtualizarProduto`, body)
        .pipe(retry(1), catchError(this.handleError));
    }

    excluirProduto(id: any): Observable<any>{
      let body = {
        'id': id
      }
      return this.http.post(`/smdecommerce/ExcluirProduto`, body)
        .pipe(retry(1), catchError(this.handleError));
    }

    handleError(error: any) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } if (error.error!=null && error.error.message!=null){
        errorMessage = error.error.message;
      }
      else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(() => {
        return errorMessage;
      });
    }

      
}
