import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudMethodsService } from '../../services/crud-methods.service';
import { Projects } from '../../models/projects.model';

@Component({
  selector: 'app-adm-portfolio',
  templateUrl: './adm-portfolio.component.html',
  styleUrls: ['./adm-portfolio.component.scss']
})
export class AdmPortfolioComponent implements OnInit {

  myForm: FormGroup;
  basePath = 'projects';
  project: Projects[];
  dados: any;

  content = '';
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '100px',
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

  categories = [
    {catName: 'Mobile'},
    {catName: 'Website'},
    {catName: 'WordPress'},
    {catName: 'Side Projects'}
  ];

  badges = [
    {badName: 'google'},
    {badName: 'ios'},
    {badName: 'web'}
  ];

  constructor(private fb: FormBuilder, private crudService: CrudMethodsService) { }

  ngOnInit() {

    this.myForm = this.fb.group({
      keyProj: this.fb.control(''),
      category: this.fb.control(''),
      title: this.fb.control(''),
      general: this.fb.control(''),
      introContent: this.fb.control(''),
      challengeContent: this.fb.control(''),
      featuresContent: this.fb.control(''),
      techContent: this.fb.control(''),
      texto: this.fb.control(''),
      link: this.fb.control(''),
      badge: this.fb.control('')
    });

    this.getProjects();
  }

  getProjects() {
    this.dados = this.crudService.getItems(this.basePath).subscribe(dado => {
      this.project = dado.map(e => {
        const data = e.payload.doc.data() as Projects;
        data.key = e.payload.doc.id;
        return data;
      });
      console.log(this.project);
      // this.myForm.controls.aboutContent.setValue(this.about[0].fullText);
      // this.myForm.controls.keyAbout.setValue(this.about[0].key);
    });
  }

}
