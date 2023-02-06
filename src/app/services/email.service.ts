import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments'
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  list_correos_by_user(user: String) {
    return this.http.get(`{environment.API_URL}?enviado_por={user}`)
  }
}
