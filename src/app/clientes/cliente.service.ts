import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ClienteService {

  private router : Router;
  private http : HttpClient;
  private urlEndPoint:string = 'http://localhost:8080/api/clientes';
  private HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor( http:HttpClient, router:Router) {
    this.http = http;
    this.router = router;
   }

  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
      map( response => response as Cliente[] ), catchError(e=> {
        console.error(e.error.mensaje);
        Swal.fire('Error al crear cliente', e.error.mensaje, 'error')
        return throwError(e);
      }))
  }

  //otra forma de castear:  return this.http.get<Cliente[]>(this.urlEndPoint)

  create(cliente: Cliente) : Observable<Cliente>{
    return this.http.post(this.urlEndPoint, cliente, {headers: this.HttpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e=> {
        if(e.status==400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  getCliente(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        //retornamos a la pagina principal
        this.router.navigate(['/clientes']);
        //mostramos el error por consola
        console.error(e.error.mensaje);
        //mostramos la alerta de error
        Swal.fire('Error al editar', e.error.mensaje, 'error') ;      
        return throwError(e);
      })
      );
  }

  updateCliente(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.HttpHeaders}).pipe(
      catchError(e=>{
        if(e.status==400){
          return throwError(e);
        }
        Swal.fire('Error al actualizar cliente', e.error.mensaje, 'error'); 
        console.error(e.error.mensaje);
        return throwError(e);
      }))
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.HttpHeaders}).pipe(
      catchError(e=> {
        Swal.fire('Error al eliminar el cliente', e.error.mensaje, 'error');
        console.error(e.error.mensaje);
        return throwError(e);
      })
    )
  }
}
