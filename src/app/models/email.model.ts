export class Email{
  fecha: string;
  asunto: string;
  contenido: string;
  enviado_por: string;
  recibido_por: string;

  constructor() {
    this.fecha = "";
    this.asunto = "";
    this.contenido = "";
    this.enviado_por = "";
    this.recibido_por = "";

  }
}
