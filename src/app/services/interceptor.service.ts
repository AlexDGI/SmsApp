import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpHeaders,
    HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {


  // get bd(): string {
  //   return localStorage.getItem("Bd") || "";
  // }
  // get razonSocial(): string {
  //   return localStorage.getItem("RazonSocial") || "";
  // }
   get idFiscalCliente(): string {
     return localStorage.getItem("IdFiscalCliente") || "";
   }
  // get client(): string {
  //   return localStorage.getItem("Client") || "";
  // }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const headers = new HttpHeaders({
      "IdFiscalCliente": this.idFiscalCliente,
    });
    const reqClone = req.clone({ headers });
    //console.log(this.idUser);
    //console.log(this.idFiscalCliente);

    return next.handle(reqClone).pipe(catchError(this.manejarError));
  }

  manejarError(error: HttpErrorResponse) {
    console.log("Ocurrió un Error en el servicio interceptor");
    console.warn(error);
    return throwError(error);
  }



  constructor() { }
}
