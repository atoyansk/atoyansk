import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { trigger, transition, animate, style, query, stagger } from '@angular/animations';

import { ScrollnavService } from '../../services/scrollnav.service';
import { CrudMethodsService } from '../../services/crud-methods.service';
import { Services } from '../../models/services.model';
import { Projects } from '../../models/projects.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

  animations: [
    trigger('enterCard', [
      transition('* => *', [
        query(':enter', style({ overflow: 'hidden', opacity: '0', transform: 'scale3d(0.001, 0.001, 1)'}), { optional: true }),
        query(':enter', stagger('300ms', [
          animate('250ms ease-out', style({opacity: '1', transform: 'scale3d(1, 1, 1)'}))
        ]), { optional: true })
      ])
    ]),

    trigger('leaveCard', [
      transition(':enter', [
        style({opacity: '1', transform: 'scale3d(1, 1, 1)'})
      ]),
      transition(':leave', [
        animate('250ms ease-out', style({opacity: '0', transform: 'scale3d(0.001, 0.001, 1)'}))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  navIsFixed: boolean;
  basePath = 'projects';
  projects: Projects[];

  selectedCategory = 'all';

  constructor(@Inject(DOCUMENT) private document: Document,
              private scrollserv: ScrollnavService,
              private crudService: CrudMethodsService) { }

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

  ngOnInit() {
    this.crudService.getItems(this.basePath).subscribe(data => {
      this.projects = data.map(e => {
        const data = e.payload.doc.data() as Projects;
        data.key = e.payload.doc.id;
        return data;
      });
    });
  }

}
