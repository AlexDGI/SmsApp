import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: "root",
})
export class FileUploadService {
    url = environment.apiUrl;
    constructor(private http: HttpClient) {}

    // Returns an observable
    upload(file: any): Observable<any[]> {
        return this.http.post<any[]>(`${this.url}cargar_datos_sms.php`, JSON.stringify(file));
    }
}
