import { Component, OnInit, HostListener, Inject, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { trigger, transition, animate, style, query, stagger } from '@angular/animations';

import { ScrollnavService } from '../../services/scrollnav.service';
import { CrudMethodsService } from '../../services/crud-methods.service';
import { Services } from '../../models/services.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],

  animations: [
    trigger('enterCard', [

      transition('* => *', [
        query(':enter', style({ overflow: 'hidden', opacity: '0', transform: 'scale3d(0.001, 0.001, 1)'}), { optional: true }),
        query(':enter', stagger('300ms', [
          animate('250ms ease-out', style({opacity: '1', transform: 'scale3d(1, 1, 1)'}))
        ]), { optional: true })
      ])

    ])
  ]
})
export class ServicesComponent implements OnInit {

  navIsFixed: boolean;
  basePath = 'services';
  services: Services[];

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
      this.services = data.map(e => {
        const serv = e.payload.doc.data() as Services;
        serv.key = e.payload.doc.id;
        return serv;
      });
    });
  }

}
