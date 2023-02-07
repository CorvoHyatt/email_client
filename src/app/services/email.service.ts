import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments'
import { Email } from '../models/email.model';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  list_correos_enviados(user: String) {
    return this.http.get(environment.API_URL + "?enviado_por=" + user)
  }
  list_correos_recibidos(user: String) {
    return this.http.get(environment.API_URL + "?para=" + user)
  }
  guardar_email(email: Email) {
    return this.http.post(environment.API_URL, email, httpOptions)
  }
}
