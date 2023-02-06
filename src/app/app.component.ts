import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Email } from './models/email.model';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  editorForm!: FormGroup
  
  mensaje: string = "Hola"
  emailsPrueba : Email[] = [];


  config = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': ['#000000', '#229954', '#FF5733', '#2E86C1', '#DC7633', '#00FF00', '#BDB76B'] }, { 'background': [] }],
    ]
  }

  onSubmit() {
    
  }

  ngOnInit() {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
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
    

    this.emailsPrueba.push(email,email_aux)
  }

}


