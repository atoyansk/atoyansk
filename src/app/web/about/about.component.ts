import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ScrollnavService } from '../../services/scrollnav.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  navIsFixed: boolean;

  constructor(@Inject(DOCUMENT) private document: Document,
              private scrollserv: ScrollnavService) { }

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
  }

}
