import { Component, OnInit, HostListener, Inject, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { trigger, transition, animate, style, query, stagger } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ScrollnavService } from '../../services/scrollnav.service';
import { CrudMethodsService } from '../../services/crud-methods.service';

import { ToastrService } from 'ngx-toastr';

// import { faFilm } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  navIsFixed: boolean;

  f: FormGroup;
  basePath = 'contacts';

  submitted = false;

  constructor(@Inject(DOCUMENT) private document: Document,
              private scrollserv: ScrollnavService,
              private crudService: CrudMethodsService,
              private fb: FormBuilder,
              public toastr: ToastrService,
              vcr: ViewContainerRef) { }

  // scroll to top
  @HostListener('window:scroll', [])
    onWindowScroll() {
      const valor: number = window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
      if (valor > 50) {
        this.navIsFixed = true;
        this.scrollserv.setdata(this.navIsFixed);
      } else if (this.navIsFixed && valor < 30) {
        this.navIsFixed = false;
        this.scrollserv.setdata(this.navIsFixed);
      }
        }
      scrollToTop() { (function smoothscroll() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 5));
            }
        })();
    }

    showSuccess() {
      this.toastr.success('Great, I am glad to receive a message from you! I will respond you shortly!');
    }

    showError() {
      this.toastr.error('Um, something went wrong ... Could you try again?');
    }

  ngOnInit() {

    this.scrollToTop();

    this.f = this.fb.group({

      name    : ['', Validators.required],
      email   : ['', [Validators.required, Validators.email]],
      message : ['', Validators.required]

    });
  }

  get fr() { return this.f.controls; }

  submit() {

    this.submitted = true;

    if (this.f.invalid) {
      return;
    }
    this.crudService.createItem(this.basePath, this.f.value)
      .then(() => {
          this.resetForm();
          this.scrollToTop();
          this.showSuccess();
        }).catch((err) => {
          this.showError();
          console.log(err);
        });
  }

  resetForm() {
    this.submitted = false;
    this.f.controls.name    .setValue('');
    this.f.controls.email   .setValue('');
    this.f.controls.message .setValue('');
  }

}
