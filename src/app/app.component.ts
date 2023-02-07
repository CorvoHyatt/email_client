import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Email } from './models/email.model';
import { EmailService } from './services/email.service';

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
    this.emailForm = new FormGroup({
      'contenido': new FormControl(''),
      'para': new FormControl(''),
      'asunto': new FormControl('')
    })
    const email = new Email()
    email.enviado_por = "corvohyatt@gmail.com"
    email.contenido = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quis non eius, esse, reiciendis dolor minima repellat eveniet ex sint veniam repellendus quidem distinctio vero iure inventore incidunt asperiores? Dolorum!"
    email.para = "snifex@gmail.com"
    email.asunto = "Saludos cordiales"
    email.fecha = "10/10/10"
    
    const email_aux = new Email()
    email_aux.enviado_por = "snifex@gmail.com"
    email_aux.para = "corvohyatt@gmail.com"
    email_aux.asunto = "Saludos cordiales Doctor"
    email_aux.fecha = "05/02/2023"
    email_aux.contenido = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quis non eius, esse, reiciendis dolor minima repellat eveniet ex sint veniam repellendus quidem distinctio vero iure inventore incidunt asperiores? Dolorum!"
    
    const emailAuxRecibidos = new Email()
    emailAuxRecibidos.enviado_por = "recibidos@gmail.com"
    emailAuxRecibidos.para = "corvorecibidos@gmail.com"
    emailAuxRecibidos.asunto = "Saludos cordiales recibidos"
    emailAuxRecibidos.fecha = "10/02/2023"
    emailAuxRecibidos.contenido = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quis non eius, esse, reiciendis dolor minima repellat eveniet ex sint veniam repellendus quidem distinctio vero iure inventore incidunt asperiores? Dolorum!"
    
    const emailAuxRecibidos2 = new Email()
    emailAuxRecibidos2.enviado_por = "recibidos@gmail.com"
    emailAuxRecibidos2.para = "corvorecibidos@gmail.com"
    emailAuxRecibidos2.asunto = "Saludos cordiales recibidos"
    emailAuxRecibidos2.fecha = "10/02/2023"
    emailAuxRecibidos2.contenido = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quis non eius, esse, reiciendis dolor minima repellat eveniet ex sint veniam repellendus quidem distinctio vero iure inventore incidunt asperiores? Dolorum!"
    
    this.emailsEnviados.push(email, email_aux)
    
    this.emailsRecibidos.push(emailAuxRecibidos, emailAuxRecibidos2)
    
    this.actualizar_correos()
  }

  actualizar_correos(){
   this.emailService.list_correos_enviados(this.usuario).subscribe((resEmail: any) => {
      this.emailsEnviados = resEmail;
    })
    this.emailService.list_correos_recibidos(this.usuario).subscribe((resEmail:any) =>{
      this.emailsRecibidos = resEmail;
    })
    setTimeout(this.actualizar_correos,2000)
  }  

  onSubmit() {
    this.mensaje = this.emailForm.get('contenido')!.value
    console.log("Para:",this.emailForm.get('para')!.value);
    console.log("Asunto:",this.emailForm.get('asunto')!.value);
    console.log("Contenido:",this.emailForm.get('contenido')!.value);
    let fecha = this.date.toLocaleString("en-GB", {
      day: "2-digit",
      month:"2-digit",
      year:"2-digit",
      hour:"2-digit",
      minute:"2-digit",
      second:"2-digit",
    });
    console.log(fecha)
    let nuevoCorreo = new Email()
    nuevoCorreo.para = this.emailForm.get('para')!.value
    nuevoCorreo.asunto = this.emailForm.get('asunto')!.value
    nuevoCorreo.contenido = this.emailForm.get('contenido')!.value
    nuevoCorreo.fecha = fecha
    nuevoCorreo.enviado_por = this.usuario
    this.emailService.guardar_email(nuevoCorreo).subscribe((res:any) => {
      console.log(res)
    }, (err:any) => console.log(err))
  }

}


