import { Email } from "../models/email.model";
var fs = require("fs");
export function save_email(email: Email) {

  let file_name = email.asunto + email.enviado_por;
  let data = JSON.stringify(email);
  fs.writeFile(file_name + ".json", data, ((err: any) => { console.log(err) }))

}
