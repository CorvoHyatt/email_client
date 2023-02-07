import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Email } from './models/email.model';
import { EmailService } from './services/email.service';

const socketURL = "ws://192.168.1.252:8080"
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  emailForm!: FormGroup
  date: any;
  mensaje: string = "Hola"
  emailsEnviados: Email[] = [];
  emailsRecibidos: Email[] = [];
  flagRecibidos: boolean = false;
  flagEnviados: boolean = true;
  correoActual: Email = new Email();
  cuentaLogueada: string = "prueba@logueado.com"

  exampleSocket: any
  usuario: string;
  para: string;
  asunto: string;

  config = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': ['#000000', '#229954', '#FF5733', '#2E86C1', '#DC7633', '#00FF00', '#BDB76B'] }, { 'background': [] }],
    ]
  }

  constructor(private emailService: EmailService) {
    this.mensaje = "";
    this.usuario = "corvohyatt@gmail.com"
    this.para = ""
    this.asunto = ""
    this.date = new Date();
    this.exampleSocket = new WebSocket(socketURL);

  }

  estadoRecibidos() {
    this.flagRecibidos = true
    this.flagEnviados = false
  }

  estadoEnviados() {
    this.flagRecibidos = false
    this.flagEnviados = true
  }

  seleccionaCorreo(email: Email) {
    this.correoActual = email
  }

  ngOnInit() {
    this.exampleSocket.onopen = (ev: any) => {
      console.log('Socket opened: ', ev);
      this.exampleSocket.send(JSON.stringify({type:'read',path:'emails'}))
    };
    
    this.exampleSocket.onmessage = (m: any) => {
      let message = JSON.parse(m.data);
      switch(message.type){
        case "create": 
          this.exampleSocket.send(JSON.stringify({type:'read',path:'emails'}))
        break;
        case "read": 
          this.emailsEnviados = message.data.filter((elemento:Email) => elemento.enviado_por == this.usuario)
          this.emailsRecibidos = message.data.filter((elemento:Email) => elemento.para == this.usuario)
        break;
      }
    };
    this.exampleSocket.onclose = (ev: any) => {
      console.log('Socket closed: ', ev);
    };

    this.emailForm = new FormGroup({
      'contenido': new FormControl(''),
      'para': new FormControl(''),
      'asunto': new FormControl('')
    })
  }

  onSubmit() {
    let fecha = this.date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    this.exampleSocket.send(
      JSON.stringify(
        {
          type: 'create',
          path: 'emails',
          data: {
            fecha: fecha,
            asunto:  this.emailForm.get('asunto')!.value,
            contenido: this.emailForm.get('contenido')!.value,
            enviado_por: this.usuario,
            para: this.emailForm.get('para')!.value,
          }
        }
      )
    );
  }

}


