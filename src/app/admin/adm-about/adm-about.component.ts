import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-adm-about',
  templateUrl: './adm-about.component.html',
  styleUrls: ['./adm-about.component.scss']
})
export class AdmAboutComponent implements OnInit {

  title = 'about';

  myForm: FormGroup;

  content = '';

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '180px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'},
        {class: 'montserrat', name: 'Montserrat'}
      ],
      customClasses: [
        {
          name: 'quote',
          class: 'quote',
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: 'titleText',
          class: 'titleText',
          tag: 'h1',
        },
      ],
      uploadUrl: 'v1/image',
      sanitize: true,
      toolbarPosition: 'top',
      toolbarHiddenButtons: []
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      aboutContent: ['', Validators.required]
    });
    console.log(this.content);
  }

  onChange(event) {
    console.warn(this.myForm.value);
  }

}
