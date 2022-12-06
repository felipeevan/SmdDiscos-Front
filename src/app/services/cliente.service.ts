import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class ClienteService {
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) { }

    registrarCliente(body: any): Observable<any>{
        return this.http.post(`/smdecommerce/NovoCliente`, body)
        .pipe(retry(1), catchError(this.handleError));
    }

    loginCliente(body: any): Observable<any>{
      return this.http.post(`/smdecommerce/Login`, body)
        .pipe(retry(1), catchError(this.handleError));
    }

    editarCliente(body: any): Observable<any>{
      return this.http.post(`/smdecommerce/AtualizarCliente`, body)
        .pipe(retry(1), catchError(this.handleError));
    }

    listarProduto(): Observable<any>{
      return this.http.get(`/smdecommerce/ListarProdutosEmEstoque`)
        .pipe(retry(1), catchError(this.handleError));
    }

    listarProdutoDaCategoria(id: any): Observable<any>{
      let body = {
        'id_categoria': id
      }
      return this.http.post(`/smdecommerce/ListarProdutosdaCategoria`, body)
        .pipe(retry(1), catchError(this.handleError));
    }

    listarCategoria(): Observable<any>{
      return this.http.get(`/smdecommerce/ListarCategoria`)
        .pipe(retry(1), catchError(this.handleError));
    }

    excluirCliente(): Observable<any>{
      return this.http.post(`/smdecommerce/ExcluirCliente`, {})
      .pipe(retry(1), catchError(this.handleError));
    }

    getProdutoById(id: any): Observable<any>{
      return this.http.post(`/smdecommerce/ObterProduto`, {"id": id})
      .pipe(retry(1), catchError(this.handleError));    
    }

    handleError(error: any) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } if (error.error!=null && error.error.mensagem!=null){
        errorMessage = error.error.mensagem;
      }
      else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`;
      }
      return throwError(() => {
        return errorMessage;
      });
    }

    realizarCompra(id: any, pagamento: any, entrega: any, items: any){
      return this.http.post(`/smdecommerce/NovaVenda`, {"id_usuario": id, "pagamento": pagamento, "entrega": entrega, "items": items})
      .pipe(retry(1), catchError(this.handleError));  
    }

    listarPedidos(id: any): Observable<any>{
      return this.http.post(`/smdecommerce/ListarVendasCliente`, {"id": id})
      .pipe(retry(1), catchError(this.handleError));    
    }
}
