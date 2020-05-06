import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudMethodsService } from '../../services/crud-methods.service';
import { Projects } from '../../models/projects.model';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap, map } from 'rxjs/operators';

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
  _ID: string;

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

  imgs: string[] = [];

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string | null>;
  downloadURLs = [];


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
        intro: this.myForm.controls.introContent.value,
        challenge: this.myForm.controls.challengeContent.value,
        features: this.myForm.controls.featuresContent.value,
        tech: this.myForm.controls.techContent.value,
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
        this._ID = id;
        console.log(this._ID);
        return this._ID;
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

  // onDrop(files: FileList) {
  //   for (let i = 0; i < files.length; i++) {
  //     this.files.push(files.item(i));
  //   }
  // }

  upload(event, index) {
    const path = `projects/${Date.now()}_${event.target.files[0].name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, event.target.files[0]);
    this.percentage = this.task.percentageChanges();

    console.log(path);
    this.task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe((url) => {
            this.downloadURL = url;
            if (index === 0) {
              this.crudService.updateItem(this.basePath, { img: this.downloadURL }, this._ID);
            } else if (index === 1) {
              this.crudService.updateItem(this.basePath, { imgIntro: this.downloadURL }, this._ID);
            } else if (index === 2) {
              this.crudService.updateItem(this.basePath, { imgFet: this.downloadURL }, this._ID);
            }
            console.log('Upload Successful');
          });
        })
      ).subscribe();
  }

  mUpload(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.imgs.push(event.target.files[i]);

      const path = `projects/${Date.now()}_${event.target.files[i].name}`;
      const ref = this.storage.ref(path);
      this.task = this.storage.upload(path, this.imgs[i]);
      this.percentage = this.task.percentageChanges();

      this.task.snapshotChanges().pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe((url) => {
              this.downloadURLs = this.downloadURLs.concat([{thumbImage: url}]);
              this.crudService.updateItem(this.basePath, { slide: this.downloadURLs }, this._ID);
              console.log('Upload Successful');
            });
          })
        ).subscribe();
    }
  }

// mUpload(event) {
//   for (let i = 0; i < event.target.files.length; i++) {
//       this.imgs = event.target.files[i];

//       this.uploadImageAsPromise(this.imgs);
//   }
// }

// uploadImageAsPromise(imageFile) {
//   return new Promise((resolve, reject) => {

//       const path = `projects/${Date.now()}_${imageFile.name}`;
//       const ref = this.storage.ref(path);

//       this.task = this.storage.upload(path, imageFile);

//       this.percentage = this.task.snapshotChanges()
//       .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
//       //Update progress bar
//       this.task.on('state_changed',
//           function progress(snapshot){
//               var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
//               uploader.value = percentage;
//           },
//           function error(err){

//           },
//           function complete(){
//               var downloadURL = task.snapshot.downloadURL;
//           }
//       );
//   });
// }

}
