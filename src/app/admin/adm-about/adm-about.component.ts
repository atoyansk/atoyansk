import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudMethodsService } from '../../services/crud-methods.service';
import { About } from '../../models/about.model';

@Component({
  selector: 'app-adm-about',
  templateUrl: './adm-about.component.html',
  styleUrls: ['./adm-about.component.scss']
})
export class AdmAboutComponent implements OnInit {

  title = 'about';

  myForm: FormGroup;
  basePath = 'about';
  about: About[];
  dados: any;

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

  constructor(private fb: FormBuilder, private crudService: CrudMethodsService) { }

  ngOnInit() {
    const today: Date = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    const yyyy = today.getFullYear();
    if (dd < 10) {dd = 0 + dd; }
    if (mm < 10) {mm = 0 + mm; }
    const hoje = dd + '/' + mm + '/' + yyyy;

    this.myForm = this.fb.group({
      keyAbout: this.fb.control(''),
      aboutContent: this.fb.control(''),
      aboutDate: this.fb.control(hoje)
    });

    this.getAbout();
  }

  getAbout() {
    this.dados = this.crudService.getItems(this.basePath).subscribe(dado => {
      this.about = dado.map(e => {
        const data = e.payload.doc.data() as About;
        data.key = e.payload.doc.id;
        return data;
      });
      this.myForm.controls.aboutContent.setValue(this.about[0].fullText);
      this.myForm.controls.keyAbout.setValue(this.about[0].key);
    });
  }

  onChange(event, ab: About) {
    // console.warn(this.myForm.value);
  }

  saveChanges() {
    this.crudService.updateItem(this.basePath, {
      fullText: this.myForm.value.aboutContent,
      creationDate: this.myForm.value.aboutDate},
      this.myForm.value.keyAbout);
    console.log('Updated!', this.myForm.value);
    this.getAbout();
  }

}
