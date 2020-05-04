import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudMethodsService } from '../../services/crud-methods.service';
import { Projects } from '../../models/projects.model';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

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
  $key: string;

  displayed = true;

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

  // isHovering: boolean;

  // files: File[] = [];

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;


  constructor(private fb: FormBuilder, private crudService: CrudMethodsService, private storage: AngularFireStorage) { }

  ngOnInit() {

    this.myForm = this.fb.group({
      $key: this.fb.control(''),
      category: this.fb.control(''),
      title: this.fb.control(''),
      general: this.fb.control(''),
      introContent: this.fb.control(''),
      challengeContent: this.fb.control(''),
      featuresContent: this.fb.control(''),
      techContent: this.fb.control(''),
      texto: this.fb.control(''),
      link: this.fb.control(''),
      badge: this.fb.control(''),
      width: this.fb.control(''),
      height: this.fb.control(''),
      space: this.fb.control('')
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

  createBasic() {
    // if (this.myForm.controls.$key.value == null) {
      return this.crudService.createItem(this.basePath, {
        category: this.myForm.controls.category.value,
        title: this.myForm.controls.title.value,
        general: this.myForm.controls.general.value,
        introContent: this.myForm.controls.introContent.value,
        challengeContent: this.myForm.controls.challengeContent.value,
        featuresContent: this.myForm.controls.featuresContent.value,
        techContent: this.myForm.controls.techContent.value,
        access: {
          texto: this.myForm.controls.texto.value,
          link: this.myForm.controls.link.value,
          badge: this.myForm.controls.badge.value
        },
        imgSize: {
          width: this.myForm.controls.width.value,
          height: this.myForm.controls.height.value,
          space: this.myForm.controls.space.value
        }
      }).then(({id}) => {
        console.log(id);
        return id;
      }).then(() => {
        this.displayed = false;
      });
    // }
  }

  delProject(key) {
    this.crudService.deleteItem(this.basePath, key);
  }

  // toggleHover(event: boolean) {
  //   this.isHovering = event;
  // }

  // onDrop(files: FileList, id: any) {
  //   for (let i = 0; i < files.length; i++) {
  //     this.files.push(files.item(i), id);
  //   }
  // }

  upload(event) {

    // The storage path
    const path = `projects/${Date.now()}_${event.target.files[0].name}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, event.target.files[0]);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();

    this.snapshot   = this.task.snapshotChanges().pipe(
      tap(console.log),
      // The file's download URL
      finalize( async () =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        this.crudService.updateItem(this.basePath, { img: this.downloadURL }, this.$key); // Not insert yet
      }),
    );
  }

}
