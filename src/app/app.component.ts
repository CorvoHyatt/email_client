import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  editorForm!: FormGroup
  editor_Style = {
    height: '300px',
    width: '700px',
    backgroundColor: '#ffffff'
  }

  mensaje:string = "Hola"


  config = {
    toolbar: [
      ['bold','italic','underline'],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': ['#000000','#229954','#FF5733','#2E86C1','#DC7633','#00FF00','#BDB76B'] }, { 'background': [] }],
    ]
  }

  onSubmit() {
    this.mensaje = this.editorForm.get('editor')!.value
    console.log(this.editorForm.get('editor')!.value)
  }

  ngOnInit() {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    })
  }
}
